import { Injectable } from "@nestjs/common";

@Injectable()
export class TemplateValuesService {
  getSentenceFormattedNames(names: string[]): string {
    return names.reduce((acc, name, index) => {
      if (index === 0) {
        return name;
      }
      if (index === names.length - 1) {
        return `${acc} and ${name}`;
      }
      return `${acc}, ${name}`;
    }, "");
  }
}
