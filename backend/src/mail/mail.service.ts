import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";
import * as handlebars from "handlebars";

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  private compileTemplates(templateName: string, variables: any) {
    const filePath = path.join(
      process.cwd(),
      "src",
      "mail",
      "templates",
      `${templateName}.hbs`
    );

    const source = fs.readFileSync(filePath, "utf-8");
    const template = handlebars.compile(source);
    return template(variables);
  }

  async sendVerificationEmail(to: string, code: string, name: string) {
    const html = this.compileTemplates("verification", {
      code,
      name,
      year: new Date().getFullYear(),
    });

    const info = await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: "Verificação de E-mail - Theophilos",
      html,
    });

    console.log("Message sent: %s", info.messageId);
  }
}
