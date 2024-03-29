import static Constants.*

class Constants {
  static final REPO = 'internal-talkingcrypto-website'
  static final DOCKER_FOLDER = '~/docker/projects/' + REPO
  static final SERVER = 'server03.wouterdeschuyter.be'
}

node {
  stage('Checkout') {
    sh 'printenv'
    checkout scm
  }

  stage('Clean') {
    sh 'make clean'
  }

  stage('Dependencies') {
  }

  stage('Build') {
    sh 'make build'
  }

  stage('Deploy') {
    if (!env.BRANCH_NAME.equals('develop') && !env.BRANCH_NAME.equals('master')) {
      sh 'echo Not develop and not master branch, skip deploy.'
      return
    }

    // Push images to registry
    sh 'echo Pushing version'
    sh 'make push-latest'

    // Deploy production if needed
    deployProduction()
  }

  // Leave Jenkins clean behind
  cleanWorkspace()
}

def deployProduction() {
  if (!env.BRANCH_NAME.equals('master')) {
    return
  }

  // Separate folder per environment
  def folder = DOCKER_FOLDER + '-prod'

  // Deploy production
  sh 'echo Deploying production..'

  // Make directory, in case it doesn't exist
  sh 'ssh wouterds@'+SERVER+' "mkdir -p '+folder+'"'

  // Copy our docker files to the server, in case it has changed
  sh 'scp docker/docker-compose-prod.yml wouterds@'+SERVER+':'+folder+'/docker-compose-prod.yml'

  // Deploy on staging
  sh 'ssh wouterds@'+SERVER+' "cd '+folder+'; docker-compose -f docker-compose-prod.yml pull"'
  sh 'ssh wouterds@'+SERVER+' "cd '+folder+'; docker-compose -f docker-compose-prod.yml up -d"'
}

def cleanWorkspace() {
  sh 'echo "Cleaning up workspace.."'
  deleteDir()
}
