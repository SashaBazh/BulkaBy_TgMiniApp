import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/_General/navigation/navigation.component';
import { HeaderComponent } from '../../components/_General/header/header.component';
import { ImageSliderComponent } from '../../components/_Home/image-slider/image-slider.component';
import { ImagesSlidersComponent } from '../../components/_Home/images-sliders/images-sliders.component';
import { NewJewelryComponent } from '../../components/_General/new-jewelry/new-jewelry.component';
import { CatalogButtonComponent } from '../../components/_Home/catalog-button/catalog-button.component';
import { CataloggeneralComponent } from '../../components/_General/cataloggeneral/cataloggeneral.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProfileService } from '../../services/_Profile/profile.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavigationComponent,
    HeaderComponent,
    ImageSliderComponent,
    ImagesSlidersComponent,
    NewJewelryComponent,
    CatalogButtonComponent,
    CataloggeneralComponent,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  items: any[] = [
    { name: 'Кольца' },
    { name: 'Серьги' },
    { name: 'Браслеты' },
    { name: 'Ожерелья' },
    { name: 'Подвески' },
  ];

  constructor(private translate: TranslateService, private userService: ProfileService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (profile) => {
        const userLang = profile.lang || 'en'; // Если язык отсутствует, используем 'en'
        console.log('Язык пользователя из профиля:', userLang);
        this.translate.setDefaultLang(userLang);
      },
      error: (err) => {
        console.error('Не удалось получить профиль пользователя. Устанавливается язык по умолчанию: "en".', err);
        this.translate.setDefaultLang('en');
      },
    });
  }
}
