import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ROUTES} from './menu-items';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FullComponent} from '../../layouts/full/full.component';
import {UserInfoService, UserInStorage} from '../../user/service/user-info.service';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../user/service/user.service';
import {ApiErrorDetails} from '../common/api/model/api-error-details';
import {Title} from '@angular/platform-browser';
import {filter, map, mergeMap} from 'rxjs/operators';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {DeviceDetectorService} from 'ngx-device-detector';

declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {

    isMobile = false;

    showMenu = '';
    showSubMenu = '';
    public sidebarnavItems: any[];
    fullname = '';
    pageInfo;
    public logoutVariable = '/authentication/logout';

    errorDetails: ApiErrorDetails;
    flagLanguage = 'flag-icon-us';

    public fullComponent: FullComponent = new FullComponent();
    @ViewChild('refreshCacheSwal') private refreshCacheSwal: SwalComponent;

    // this is for the open close
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
        } else {
            this.showSubMenu = element;
        }
    }

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private route: ActivatedRoute,
        private userInfoService: UserInfoService,
        private cdr: ChangeDetectorRef,
        private userService: UserService,
        private translate: TranslateService,
        private deviceService: DeviceDetectorService
    ) {

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .pipe(map(() => this.activatedRoute))
            .pipe(
                map(route => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                })
            )
            .pipe(filter(route => route.outlet === 'primary'))
            .pipe(mergeMap(route => route.data))
            .subscribe(event => {
                this.titleService.setTitle(event['title']);
                this.pageInfo = event;
            });

        const userLang = this.userInfoService.getUserLang().toUpperCase();

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('EN');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);

        this.getUserLangFlag(userLang);

        this.isMobile = this.deviceService.isMobile();
    }

    // End open close
    ngOnInit() {
        this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
        this.fullname = this.userInfoService.getUsername();

        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {

        this.cdr.detach();
    }

    getUserLangFlag(language) {

        if (language === 'EN') {
            this.flagLanguage = 'flag-icon-us';
        } else if (language === 'IT') {
            this.flagLanguage = 'flag-icon-it';
        }
    }

    closeMobileMenu() {
        this.userService.showMobileMenu.emit(false);
    }
}
