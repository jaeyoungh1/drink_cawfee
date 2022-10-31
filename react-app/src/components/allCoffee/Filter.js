import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadAllCoffee } from "../../store/coffee";
import filter from '../../icons/filter.svg'
import plus from '../../icons/plus.svg'
import minus from '../../icons/minus.svg'
import './allCoffee.css'
import brokenImg from '../../icons/broken-img.png'
import { loadAllBrand } from "../../store/brand";

export default function Filter({getFilterArr}) {
    const dispatch = useDispatch()
    const [dropdownOpenRoast, setDropdownOpenRoast] = useState(false)
    const [dropdownOpenOrigin, setDropdownOpenOrigin] = useState(false)
    const [dropdownOpenNotes, setDropdownOpenNotes] = useState(false)
    const [dropdownOpenBrands, setDropdownOpenBrands] = useState(false)
    const [filterArr, setFilterArr] = useState([])
    const brands = useSelector(state => state.brand.allBrand)
    let allBrands 
    if (brands) {
        let coffeeBrands = Object.values(brands).map(obj => obj.name)
        let brand_set = new Set()
        coffeeBrands.forEach(arr => brand_set.add(arr))
        allBrands = Array.from(brand_set)
    }

    // console.log("ALL BRANDS", allBrands)

    useEffect(() => {
        dispatch(loadAllBrand())
    }, [dispatch])

    function toggleFilter(category, param) {
        let obj = {}
        obj[category] = param
        let filter = [...filterArr]
        // console.log("CATEGORY PARAMS", category, param)

        if (filterArr.filter(obj => obj[category] === param).length > 0) {
            let _filter = filter.filter(obj => (obj[category] !== param))
            setFilterArr(_filter)
        }
        else {
            filter.push(obj)
            setFilterArr(filter)
        }
    }
    console.log("CURRENT FILTERARR", filterArr)
    getFilterArr(filterArr)

    return (
        <div>
            <div className='filter-header'>
                <img src={filter} height='44px' width='44px' alt='filter' />
                <h2>Filter</h2>
            </div>
            <div>
                <div onClick={() => setDropdownOpenRoast(!dropdownOpenRoast)}>
                    <div>Roast Level</div>
                    <img src={dropdownOpenRoast ? minus : plus} height='12px' width='12px' alt='filter plus' />
                </div>
                {dropdownOpenRoast && <div>
                    <div onClick={() => toggleFilter('roast', 'light')}>Light</div>
                    <div onClick={() => toggleFilter('roast', 'medium')}>Medium</div>
                    <div onClick={() => toggleFilter('roast', 'dark')}>Dark</div>
                </div>}
                <div onClick={() => setDropdownOpenOrigin(!dropdownOpenOrigin)}>
                    <div>Origin</div>
                    <img src={dropdownOpenOrigin ? minus : plus} height='12px' width='12px' alt='filter plus' />
                </div>
                {dropdownOpenOrigin && <div>
                    <div onClick={() => toggleFilter('origin', 'Brazil')}>Brazil</div>
                    <div onClick={() => toggleFilter('origin', 'Burundi')}>Burundi</div>
                    <div onClick={() => toggleFilter('origin', 'Colombia')}>Colombia</div>
                    <div onClick={() => toggleFilter('origin', 'Congo')}>Congo</div>
                    <div onClick={() => toggleFilter('origin', 'Costa Rica')}>Costa Rica</div>
                    <div onClick={() => toggleFilter('origin', 'El Salvador')}>El Salvador</div>
                    <div onClick={() => toggleFilter('origin', 'Ethiopia')}>Ethiopia</div>
                    <div onClick={() => toggleFilter('origin', 'Guatemala')}>Guatemala</div>
                    <div onClick={() => toggleFilter('origin', 'Honduras')}>Honduras</div>
                    <div onClick={() => toggleFilter('origin', 'Indonesia')}>Indonesia</div>
                    <div onClick={() => toggleFilter('origin', 'Kenya')}>Kenya</div>
                    <div onClick={() => toggleFilter('origin', 'Mexico')}>Mexico</div>
                    <div onClick={() => toggleFilter('origin', 'Nicaragua')}>Nicaragua</div>
                    <div onClick={() => toggleFilter('origin', 'Panama')}>Panama</div>
                    <div onClick={() => toggleFilter('origin', 'Papua New Guinea')}>Papua New Guinea</div>
                    <div onClick={() => toggleFilter('origin', 'Peru')}>Peru</div>
                    <div onClick={() => toggleFilter('origin', 'Rwanda')}>Rwanda</div>
                    <div onClick={() => toggleFilter('origin', 'Sulawesi')}>Sulawesi</div>
                    <div onClick={() => toggleFilter('origin', 'Sumatra')}>Sumatra</div>
                    <div onClick={() => toggleFilter('origin', 'Tanzania')}>Tanzania</div>
                    <div onClick={() => toggleFilter('origin', 'Uganda')}>Uganda</div>
                </div>}
                <div onClick={() => setDropdownOpenNotes(!dropdownOpenNotes)}>
                    <div>Notes</div>
                    <img src={dropdownOpenNotes ? minus : plus} height='12px' width='12px' alt='filter plus' />
                </div>
                {dropdownOpenNotes && <div>
                    <div onClick={() => toggleFilter('note', 'Berry Fruit')}>Berry Fruit</div>
                    <div onClick={() => toggleFilter('note', 'Stone Fruit')}>Stone Fruit</div>
                    <div onClick={() => toggleFilter('note', 'Tropical Fruit')}>Tropical Fruit</div>
                    <div onClick={() => toggleFilter('note', 'Citrus')}>Citrus</div>
                    <div onClick={() => toggleFilter('note', 'Florals')}>Florals</div>
                    <div onClick={() => toggleFilter('note', 'Vanilla')}>Vanilla</div>
                    <div onClick={() => toggleFilter('note', 'Brown Sugar')}>Brown Sugar</div>
                    <div onClick={() => toggleFilter('note', 'Milk Chocolate')}>Milk Chocolate</div>
                    <div onClick={() => toggleFilter('note', 'Nutty')}>Nutty</div>
                    <div onClick={() => toggleFilter('note', 'Spices')}>Spices</div>
                    <div onClick={() => toggleFilter('note', 'Roastiness')}>Roastiness</div>
                </div>}
                <div onClick={() => setDropdownOpenBrands(!dropdownOpenBrands)}>
                    <div>Roasters</div>
                    <img src={dropdownOpenBrands ? minus : plus} height='12px' width='12px' alt='filter plus' />
                </div>
                {dropdownOpenBrands && allBrands.map(name => {
                    return (
                        <div onClick={() => toggleFilter('brand', name)}>{name}</div>
                    )
                })}
            </div>
        </div>
    )
}