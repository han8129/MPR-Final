class Player {
  private static instance: Player;
  private name: string;
  private title: string;
  private age: number;
  private health: number;
  private money: number;
  private smarts: number;
  private careerChoice: string;
  private educationPassed: string[];
  

  private constructor() {
    // call service to get data
    this.name = "Player";
    this.age = 19;
    this.title = "Infant";
    this.health = 30;
    this.money = 0;
    this.smarts = 10;
    this.educationPassed = [];
    this.careerChoice = "";
  }

  static getInstance(): Player {
    if (!this.instance) {
      this.instance = new Player();
    }
    return Player.instance;
  }

  updateAge(value: number) {
    this.age += value;
  }

  updateHealth(value: number) {
    this.health += value;
  }

  updateTitle() {
    this.title =
      this.age > 17
        ? "College Student"
        : this.age > 14
        ? "High School Student"
        : this.age > 10
        ? "Secondary School Student"
        : "Primary School Student";
  }

  updateMoney(amount: number) {
    this.money += amount;
  }

  updateSmarts(value: number) {
    this.smarts += value;
  }


  getAge() {
    return this.age;
  }

  getTitle() {
    return this.title;
  }

  getHealth() {
    return this.health;
  }

  getMoney() {
    return this.money;
  }

  getSmarts() {
    return this.smarts;
  }

  getCareerChoice() {
    return this.careerChoice;
  }

  setCareerChoice(career: string) {
    this.careerChoice = career;
  }

  getName() {
    return this.name;
  }

  getActivitiesCompleted() {
    return this.educationPassed;
  }

  updateActivitiesCompleted(educationId: string) {
    this.educationPassed.push(educationId);
  }
}

export default Player;
