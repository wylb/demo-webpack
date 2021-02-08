import $ from 'jquery';
import './css/style.css';
import icon from './images/icon.png';

function addIcon() {
    $('.demo').append('<img src="'+ icon+'"/>');
}

addIcon();
