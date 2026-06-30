import { ChallengerService } from './challenger.service';
import { ChallengesService } from './challenges.service';
import { TodosService } from './todos.service';

export class Api {
  constructor(request) {
    this.request = request;
    this.challenger = new ChallengerService(request);
    this.challenges = new ChallengesService(request);
    this.todos = new TodosService(request);
  }
}
