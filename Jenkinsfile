pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "smart-task-manager"
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Explicitly checkout the 'main' branch
                git branch: 'main', url: 'https://github.com/gurneetjuneja/smart-task-manager.git'
            }
        }

        stage('Build Services') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running unit tests (add test commands here if needed)...'
            }
        }

        stage('Deploy Services') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
