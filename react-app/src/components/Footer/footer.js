import { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getOneCoffee } from "../../store/coffee";
import arrow from '../../icons/whitearrow.svg'
import './footer.css'

export default function Footer() {

    return (
        <div className='footer-wrapper'>
           <div>
                A <a className='anchor' href='www.drinktrade.com'>Drink Trade</a> clone made by Jae Hwang
           </div>
        </div>
    )
}