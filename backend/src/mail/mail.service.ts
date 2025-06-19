import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";
import * as handlebars from "handlebars";

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);
  private templatesCache = new Map<string, handlebars.TemplateDelegate>();

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

  private getTemplate(name: string): handlebars.TemplateDelegate {
    if (this.templatesCache.has(name)) {
      return this.templatesCache.get(name)!;
    }

    const filePath = path.join(
      process.cwd(),
      "src",
      "mail",
      "templates",
      `${name}.hbs`
    );

    let source: string;

    try {
      source = fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      this.logger.error(`Template não encontrado em ${filePath}: ${error}`);
      throw new InternalServerErrorException(
        "Erro interno ao processar e-mail"
      );
    }

    const template = handlebars.compile(source);
    this.templatesCache.set(name, template);
    return template;
  }

  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    variables: Record<string, any>
  ) {
    const template = this.getTemplate(templateName);
    const html = template(variables);

    try {
      const info = await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        html,
      });
      this.logger.log("E-mail enviado para " + to);
    } catch (error) {
      this.logger.error("Erro ao enviar e-mail para " + to + ": " + error);
      throw new InternalServerErrorException(
        "Não foi possível enviar o e-mail."
      );
    }
  }

  async sendVerificationEmail(to: string, code: string, name: string) {
    await this.sendEmail(
      to,
      "Verificação de E-mail - Theophilos",
      "verification",
      {
        code,
        name,
        year: new Date().getFullYear(),
      }
    );
  }
}
