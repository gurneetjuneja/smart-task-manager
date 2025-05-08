pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "smart-task-manager"
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository
                git 'https://github.com/gurneetjuneja/smart-task-manager.git'
            }
        }

        stage('Build Services') {
            steps {
                // Build the Docker services
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Run your tests here (if applicable)
                echo 'Running unit tests (add test commands here if needed)...'
            }
        }

        stage('Deploy Services') {
            steps {
                // Deploy the services in detached mode
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            // This section will always execute regardless of success or failure
            echo 'Pipeline completed.'
        }
        failure {
            // This section will execute only if the pipeline fails
            echo 'Pipeline failed!'
        }
    }
}
