#!/usr/bin/env groovy

pipeline {
  agent {
    node {
      label 'nodejs'
    }
  }
  stages {
    stage('Install Packages') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
      post {
        always {
          publishHTML (target: [
            allowMissing: false,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: 'coverage',
            reportFiles: 'index.html',
            reportName: "Nyc Coverage Report"
          ])
          junit "test-results.xml"
        }
      }
    }
  }
}
