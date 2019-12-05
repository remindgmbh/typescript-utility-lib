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
      parallel {
        stage('Run Tests') {
          steps {
            sh 'npm test'
          }
        }
      }
    }
  }
}
