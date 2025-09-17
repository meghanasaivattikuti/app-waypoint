project = "webserver"

app "ecommerce" {
  build {
    use "docker" {
      image = "meghanasaiv/mini-ecommerce"
      tag   = "latest"
    }
  }

  deploy {
    use "aws-ecs" {
      region        = "us-east-1"
      cluster       = "waypoint-ecs-cluster"
      memory        = 512
      cpu           = 256
      task_role_arn = "arn:aws:iam::590183839876:role/ecomm_ecs_task"
    }
  }

  release {
    use "aws-alb" {
      listener_arn = "arn:aws:elasticloadbalancing:us-east-1:590183839876:loadbalancer/app/ecomm/5057f2f935f507e9"
      port         = 80
    }
  }
}
