import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AngularFireModule} from "angularfire2";
import {ReactiveFormsModule} from "@angular/forms";
import {firebaseConfig, authConfig} from "../environments/firebase.config";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {LessonsService} from "./shared/services/lessons.service";
import {LessonsListComponent} from "./lessons/lessons-list/lessons-list.component";
import {RouterModule} from "@angular/router";
import {APP_ROUTES} from "./app.routes";
import {TopMenuComponent} from "./top-menu/top-menu.component";
import {CoursesListComponent} from "./courses/courses-list/courses-list.component";
import {CoursesService} from "./shared/services/courses.service";
import {CourseDetailComponent} from "./courses/course-detail/course-detail.component";
import {LessonDetailComponent} from "./lessons/lesson-detail/lesson-detail.component";
import {SecureUrlPipe} from "./shared/security/secure-url.pipe";
import {LessonFormComponent} from './lessons/lesson-form/lesson-form.component';
import {NewLessonFormComponent} from './lessons/new-lesson-form/new-lesson-form.component';
import {EditLessonFormComponent} from './lessons/edit-lesson-form/edit-lesson-form.component';
import {LessonResolver} from "./shared/resolvers/lesson.resolver";
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {AuthService} from "./shared/services/auth.service";
import {AuthGuard} from "./shared/security/auth.guard";
import {HttpModule} from "@angular/http";
import { ProfileComponent } from './login/profile/profile.component';
import { ProfileFormComponent } from './login/profile-form/profile-form.component';
import {UserResolver} from "./shared/resolvers/user.resolver";
import { MessageComponent } from './shared/messages/message/message.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LessonsListComponent,
        TopMenuComponent,
        CoursesListComponent,
        CourseDetailComponent,
        LessonDetailComponent,
        SecureUrlPipe,
        LessonFormComponent,
        NewLessonFormComponent,
        EditLessonFormComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        ProfileFormComponent,
        MessageComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(firebaseConfig, authConfig),
        RouterModule.forRoot(APP_ROUTES),
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [
        LessonsService,
        CoursesService,
        LessonResolver,
        AuthService,
        AuthGuard,
        UserResolver
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
