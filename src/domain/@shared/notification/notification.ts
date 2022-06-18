export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationErrorProps[] = [];

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  messages(context: string = null): string {
    return this.errors
      .filter((error) => error.context === context || context == null)
      .map((error) => `${error.context}: ${error.message}`)
      .join(", ");
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}
