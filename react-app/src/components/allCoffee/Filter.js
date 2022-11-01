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

export default function Filter({ getFilterArr }) {
    const dispatch = useDispatch()
    const [dropdownOpenRoast, setDropdownOpenRoast] = useState(false)
    const [dropdownOpenOrigin, setDropdownOpenOrigin] = useState(false)
    const [dropdownOpenNotes, setDropdownOpenNotes] = useState(false)
    const [dropdownOpenBrands, setDropdownOpenBrands] = useState(false)
    const [filterArr, setFilterArr] = useState([])
    const [toggleClassName, setToggleClassName] = useState([])
    let search = useLocation().search
    let origin = new URLSearchParams(search).get('origin')


    const brands = useSelector(state => state.brand.allBrand)
    let allBrands
    if (brands) {
        let coffeeBrands = Object.values(brands).map(obj => obj.name)
        let brand_set = new Set()
        coffeeBrands.forEach(arr => brand_set.add(arr))
        allBrands = Array.from(brand_set)
    }

    useEffect(() => {
        clearFilter()
    }, [search])


    useEffect(() => {
        dispatch(loadAllBrand())
    }, [dispatch])

    function toggleFilter(category, param) {
        let obj = {}
        obj[category] = param
        let filter = [...filterArr]

        if (filterArr.filter(obj => obj[category] === param).length > 0) {
            let _filter = filter.filter(obj => (obj[category] !== param))
            setFilterArr(_filter)
        }
        else {
            filter.push(obj)
            setFilterArr(filter)
        }
    }

    function clearFilter() {
        setFilterArr([])
        setToggleClassName([])
    }
    function toggleColor(param) {
        // console.log(param)
        let toggleArr = [...toggleClassName]
        if (toggleArr.includes(param)) {
            let i = toggleArr.indexOf(param)
            toggleArr.splice(i, 1)
            setToggleClassName(toggleArr)
            return
        } else {
            toggleArr.push(param)
            setToggleClassName(toggleArr)
            return
        }
    }
    // console.log("CURRENT FILTERARR", filterArr)
    getFilterArr(filterArr)

    return (
        <div>
            <div className='filter-header'>
                <div>
                    <img src={filter} height='44px' width='44px' alt='filter' onError={e => e.target.src = { brokenImg }} />
                    <h2>Filter</h2>
                </div>
                <div className='filter-clear' onClick={() => clearFilter()}>Clear</div>
            </div>
            <div className='filter-body-wrapper'>
                <div className='filter-line-break'></div>
                <div className='filter-body-title' onClick={() => setDropdownOpenRoast(!dropdownOpenRoast)}>
                    <div>Roast Level</div>
                    <img src={dropdownOpenRoast ? minus : plus} height='12px' width='12px' alt='filter plus' />
                </div>
                {dropdownOpenRoast && <div>
                    <div className={toggleClassName.includes('light') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('light')}>
                        <div className='filter-body' onClick={() => toggleFilter('roast', 'light')}> Light</div>
                    </div>
                    <div className={toggleClassName.includes('medium') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('medium')}>
                        <div className='filter-body' onClick={() => toggleFilter('roast', 'medium')}>Medium</div>
                    </div>
                    <div className={toggleClassName.includes('dark') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('dark')}>
                        <div className='filter-body' onClick={() => toggleFilter('roast', 'dark')}>Dark</div>
                    </div>
                </div>}
                {origin !== 'Various (blend)' && <div className='filter-line-break'></div>}

                {origin !== 'Various (blend)' && <div className='filter-body-title' onClick={() => setDropdownOpenOrigin(!dropdownOpenOrigin)}>
                    <div>Origin</div>
                    <img src={dropdownOpenOrigin ? minus : plus} height='12px' width='12px' alt='filter plus' />
                </div>}
                {dropdownOpenOrigin && <div>
                    <div className={toggleClassName.includes('brazil') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('brazil')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Brazil')}>Brazil</div>
                    </div>
                    <div className={toggleClassName.includes('burundi') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('burundi')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Burundi')}>Burundi</div>
                    </div>
                    <div className={toggleClassName.includes('colombia') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('colombia')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Colombia')}>Colombia</div>
                    </div>
                    <div className={toggleClassName.includes('congo') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('congo')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Congo')}>Congo</div>
                    </div>
                    <div className={toggleClassName.includes('costaRica') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('costaRica')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Costa Rica')}>Costa Rica</div>
                    </div>
                    <div className={toggleClassName.includes('salvador') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('salvador')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'El Salvador')}>El Salvador</div>
                    </div>
                    <div className={toggleClassName.includes('ethiopia') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('ethiopia')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Ethiopia')}>Ethiopia</div>
                    </div>
                    <div className={toggleClassName.includes('guatemala') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('guatemala')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Guatemala')}>Guatemala</div>
                    </div>
                    <div className={toggleClassName.includes('honduras') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('honduras')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Honduras')}>Honduras</div>
                    </div>
                    <div className={toggleClassName.includes('indonesia') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('indonesia')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Indonesia')}>Indonesia</div>
                    </div>
                    <div className={toggleClassName.includes('kenya') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('kenya')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Kenya')}>Kenya</div>
                    </div>
                    <div className={toggleClassName.includes('mexico') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('mexico')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Mexico')}>Mexico</div>
                    </div>
                    <div className={toggleClassName.includes('nicaragua') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('nicaragua')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Nicaragua')}>Nicaragua</div>
                    </div>
                    <div className={toggleClassName.includes('panama') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('panama')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Panama')}>Panama</div>
                    </div>
                    <div className={toggleClassName.includes('papua') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('papua')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Papua New Guinea')}>Papua New Guinea</div>
                    </div>
                    <div className={toggleClassName.includes('peru') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('peru')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Peru')}>Peru</div>
                    </div>
                    <div className={toggleClassName.includes('rwanda') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('rwanda')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Rwanda')}>Rwanda</div>
                    </div>
                    <div className={toggleClassName.includes('sulawesi') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('sulawesi')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Sulawesi')}>Sulawesi</div>
                    </div>
                    <div className={toggleClassName.includes('sumatra') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('sumatra')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Sumatra')}>Sumatra</div>
                    </div>
                    <div className={toggleClassName.includes('tanzania') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('tanzania')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Tanzania')}>Tanzania</div>
                    </div>
                    <div className={toggleClassName.includes('uganda') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('uganda')}>
                        <div className='filter-body' onClick={() => toggleFilter('origin', 'Uganda')}>Uganda</div>
                    </div>
                </div>}
                <div className='filter-line-break'></div>

                <div className='filter-body-title' onClick={() => setDropdownOpenNotes(!dropdownOpenNotes)}>
                    <div>Notes</div>
                    <img src={dropdownOpenNotes ? minus : plus} height='12px' width='12px' alt='filter plus' />
                </div>
                {dropdownOpenNotes && <div>
                    <div className={toggleClassName.includes('berry') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('berry')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Berry Fruit')}>Berry Fruit</div>
                    </div>
                    <div className={toggleClassName.includes('stone') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('stone')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Stone Fruit')}>Stone Fruit</div>
                    </div>
                    <div className={toggleClassName.includes('tropical') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('tropical')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Tropical Fruit')}>Tropical Fruit</div>
                    </div>
                    <div className={toggleClassName.includes('citrus') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('citrus')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Citrus')}>Citrus</div>
                    </div>
                    <div className={toggleClassName.includes('florals') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('florals')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Florals')}>Florals</div>
                    </div>
                    <div className={toggleClassName.includes('vanilla') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('vanilla')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Vanilla')}>Vanilla</div>
                    </div>
                    <div className={toggleClassName.includes('sugar') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('sugar')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Brown Sugar')}>Brown Sugar</div>
                    </div>
                    <div className={toggleClassName.includes('milkChocolate') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('milkChocolate')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Milk Chocolate')}>Milk Chocolate</div>
                    </div>
                    <div className={toggleClassName.includes('nutty') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('nutty')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Nutty')}>Nutty</div>
                    </div>
                    <div className={toggleClassName.includes('spices') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('spices')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Spices')}>Spices</div>
                    </div>
                    <div className={toggleClassName.includes('roastiness') ? 'filter-body filter-selected' : 'filter-body'}
                        onClick={() => toggleColor('roastiness')}>
                        <div className='filter-body' onClick={() => toggleFilter('note', 'Roastiness')}>Roastiness</div>
                    </div>
                </div>}
                <div className='filter-line-break'></div>

                <div className='filter-body-title' onClick={() => setDropdownOpenBrands(!dropdownOpenBrands)}>
                    <div>Roasters</div>
                    <img src={dropdownOpenBrands ? minus : plus} height='12px' width='12px' alt='filter plus' />
                </div>
                {dropdownOpenBrands && allBrands.map(name => {
                    return (
                        <div className={toggleClassName.includes(name) ? 'filter-body filter-selected' : 'filter-body'}
                            onClick={() => toggleColor(name)}>
                            <div className='filter-body' onClick={() => toggleFilter('brand', name)}>{name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}