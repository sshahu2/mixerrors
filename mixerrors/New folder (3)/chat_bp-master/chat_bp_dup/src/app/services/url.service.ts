import {Injectable} from '@angular/core';

@Injectable()
export class URLService {
    host="http://localhost:4802";
    getAdminFeedbackURL(){
        return this.host+"/update_feedbacks";
    }
    getBotResponseURL(){
        return this.host+"/get";
    }
    getLoginURL(){
        return this.host+"/login";
    }
    getLogoutURL(){
        return this.host+"/logout";
    }
    getAddFeedbackURL(){
        return this.host+"/add_feedback";
    }
    getAllFeedbackURL(){
        return this.host+"/get_all_feedback";
    }
    getAutocompleteURL(){
        return this.host+"/autocomplete";
    }
    getChatlogsURL(){
        return this.host+"/get_chatlogs";
    }
    getChatLogsSavedURL(){
        return this.host+'/static/chat_archives';
    }
    getOverallFeedbackURL(){
        return this.host+'/give_overall_feedback';
    }
}