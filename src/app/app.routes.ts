import {Route} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CoursesListComponent} from "./courses/courses-list/courses-list.component";
import {CourseDetailComponent} from "./courses/course-detail/course-detail.component";
import {LessonDetailComponent} from "./lessons/lesson-detail/lesson-detail.component";
import {NewLessonFormComponent} from "./lessons/new-lesson-form/new-lesson-form.component";
import {EditLessonFormComponent} from "./lessons/edit-lesson-form/edit-lesson-form.component";
import {LessonResolver} from "./shared/resolvers/lesson.resolver";
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {AuthGuard} from "./shared/security/auth.guard";
import {ProfileComponent} from "./login/profile/profile.component";
import {UserResolver} from "./shared/resolvers/user.resolver";

export const APP_ROUTES: Route[] = [
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "courses",
        children: [
            {
                path: ":id",
                children: [
                    {
                        path: "",
                        component: CourseDetailComponent
                    },
                    {
                        path: "new",
                        component: NewLessonFormComponent
                    }
                ]
            },
            {
                path: "",
                component: CoursesListComponent
            }
        ]
    },
    {
        path: 'lessons/:id',
        children: [
            {
                path: "edit",
                component: EditLessonFormComponent,
                resolve: {
                    lesson: LessonResolver
                }
            },
            {
                path: "",
                component: LessonDetailComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent,
        resolve: {
            user: UserResolver
        }
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
        resolve: {
            user: UserResolver
        }
    },
    {
        path: "",
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: "**",
        redirectTo: 'home'
    }
];
