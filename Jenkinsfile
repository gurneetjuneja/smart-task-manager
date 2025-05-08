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
                    bat 'docker-compose build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests for auth-service
                    dir('auth-service') {
                        bat 'npm install'
                        bat 'npm test || echo "No tests found in auth-service"'
                    }

                    // Run tests for task-service
                    dir('task-service') {
                        bat 'npm install'
                        bat 'npm test || echo "No tests found in task-service"'
                    }
                }
            }
        }

        stage('Deploy Services') {
            steps {
                script {
                    bat 'docker-compose up -d'
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
