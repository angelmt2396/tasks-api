import TeamsModel from '../models/teams.js';
import { responses } from '../utils/response-catalogs.js';
import { CustomException } from '../utils/custom-exception.js';
import {
  EMAIL_DOES_NOT_EXIST,
  TEAM_DOES_NOT_EXIST,
} from '../utils/constants.js';
import UsersModel from '../models/user.js';

class TeamsService {
  async findAllTeams() {
    return TeamsModel.find().select('name');
  }

  async addUserToTeamByEmail(teamName, userEmail) {
    const team = await TeamsModel.findOne({ name: teamName });
    if (!team) {
      throw new CustomException(
        responses.error.doesNotExist(TEAM_DOES_NOT_EXIST),
      );
    }

    const user = await UsersModel.findOne({ email: userEmail });
    if (!user) {
      throw new CustomException(
        responses.error.doesNotExist(EMAIL_DOES_NOT_EXIST),
      );
    }
    if (!team.users.includes(user._id)) {
      team.users.push(user._id);
      await team.save();
    }

    return { name: teamName };
  }

  async getEmailsByTeamName(name) {
    const team = await TeamsModel.findOne({ name }).populate('users');
    if (!team) {
      throw new CustomException(
        responses.error.doesNotExist(TEAM_DOES_NOT_EXIST),
      );
    }

    return team.users.map((user) => user.email);
  }
}

export const teamsService = new TeamsService();
