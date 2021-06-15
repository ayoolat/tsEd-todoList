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

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  typeorm: [
    {
      name: "todo",
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "pvt_pg_admin",
      password: "P@lmV13wpgSQ1",
      database: "todo",
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
