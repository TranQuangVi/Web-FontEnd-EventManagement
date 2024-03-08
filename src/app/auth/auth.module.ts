import { NgModule } from '@angular/core';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { NbPasswordAuthStrategy, NbAuthModule, NbDummyAuthStrategy, NbAuthJWTToken, getDeepFromObject } from '@nebular/auth';
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';
@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        AuthRoutingModule,
        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'tokenLogin',
                    baseEndpoint: 'http://localhost:8080/tai-khoan',
                    login: {
                        endpoint: '/sign-in',
                        redirect: {
                            success: '/client/hoatdong',
                          //  failure: null, // stay on the same page
                          },
                    },
                    
                    token: {
                        class: NbAuthJWTToken,
                        key: 'accessToken',

                    }
                }),
            ],
            forms: {
                login: {
                    redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
                    strategy: 'tokenLogin',
                    rememberMe: true,   // whether to show or not the `rememberMe` checkbox
                    showMessages: {     // show/not show success/error messages
                        success: true,
                        error: null,
                    },
                }

            },
        }),
    ],
    declarations: [
        LoginComponent,
    ],
})
export class AuthModule {
}
