import './scss/styles.scss';
import {Card} from './components/Card'
import { ICard } from './types';

const cardFullTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement
const cardContainer = document.querySelector('.gallery') as HTMLElement;

const cardSample: ICard =  {
    category: 'sample category',
    id: '12345',
    name: 'sample name',
    description: 'sample description',
    image: 'https://multivarenie.ru/images/multivarenie/2015/01/83.jpg',
    price: 15}


const productCard = new Card(cardFullTemplate);
cardContainer.prepend(productCard.render(cardSample))



