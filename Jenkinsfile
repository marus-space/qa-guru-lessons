pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        nodejs('NodeJS 24.18.0') {
          sh 'npm ci'
          sh 'npx playwright install --with-deps'
          sh 'npm t'
        }
      }
    }

    stage('Allure') {
      steps {
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
}