pipeline {
  agent any

  stages {
    stage('Build and Test') {
      steps {
        nodejs('NodeJS 24.18.0') {
          sh 'npm ci'
          sh 'npx playwright install --with-deps'

          withAllureUpload(
            credentialsId: 'allure-testops-api-token',
            name: '${JOB_NAME} - #${BUILD_NUMBER}',
            projectId: '5283',
            results: [[path: 'allure-results']],
            serverId: 'Allure TestOps',
            tags: ''
          ) {
            sh 'npm test'
          }
        }
      }
    }
  }

  post {
    always {
      allure(
        includeProperties: false,
        jdk: '',
        properties: [],
        reportBuildPolicy: 'ALWAYS',
        results: [[path: 'allure-results']]
      )
    }
  }
}