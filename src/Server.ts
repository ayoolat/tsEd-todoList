import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import {config, rootDir} from "./config";
import "@tsed/typeorm";
import {Todo} from "./controllers/todo"
import * as ormConfig from 'ormconfig.json'
require("dotenv").config();

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  typeorm: [
    {
      name: process.env.ORM_CONFIG_NAME,
      type: "postgres",
      host: process.env.ORM_CONFIG_HOST,
      port: 5432,
      username: process.env.ORM_CONFIG_USERNAME,
      password: process.env.ORM_CONFIG_PASSWORD,
      database: process.env.ORM_CONFIG_DATABASE,
      synchronize: true,  
      logging: false,
      entities: [
        `${__dirname}/entity/*{.ts,.js}`
      ],
      migrations: [
        `${__dirname}/migrations/*{.ts,.js}`
      ],
      subscribers: [
        `${__dirname}/subscriber/*{.ts,.js}`
      ]
    }
  ],
  mount: {
    "/rest":`${rootDir}/controllers/**/*.ts`,
    "/manual":[
      Todo
    ]
  
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
