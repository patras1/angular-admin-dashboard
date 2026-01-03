export interface Rule {
  id: string;
  name: string;
  enable: boolean;
  conditionKey: string;
  conditionValue: string;
  actionKey: string;
  actionValue: string;
}

