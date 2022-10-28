import { useEffect, useState } from "react";
import { NavLink, useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllCoffee } from "../../store/coffee";
import { addOneCoffee } from "../../store/coffee";
import brokenImg from '../../icons/broken-img.png'
import './newCoffee.css'

export default function NewCoffee() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([]);

    const [brand, setBrand] = useState('Barefoot Coffee Roasters');
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('Brazil');
    const [roast, setRoast] = useState('light');
    const [inventory, setInventory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [img_url, setImg_Url] = useState('')
    const [days, setDays] = useState([])
    const [notes, setNotes] = useState([])

    const NOTES_OPT = ["Berry Fruit",
        "Stone Fruit",
        "Citrus",
        "Florals",
        "Vanilla",
        "Earthy",
        "Brown Sugar",
        "Milk Chocolate",
        "Nutty",
        "Spices",
        "Roastiness",
        "Tropical Fruit"]
    const DAYS_OPT = ['Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday']
    const ORIGIN_OPT = ['Brazil', 'Burundi', 'Colombia', 'Congo', 'Costa Rice',
        'El Salvador', 'Ethiopia', 'Guatemala', 'Honduras', 'Indonesia', 'Kenya',
        'Mexico', 'Nicaragua', 'Panama', 'Papua New Guinea', 'Peru', 'Rwanda', 'Sulawesi',
        'Sumatra', 'Tanzania', 'Uganda', 'Various (Blend)']
    const ROAST_OPT = ['Light', 'Medium', 'Dark']
    const user = useSelector(state => state.session.user)
    const coffee_b = useSelector(state => state.coffee.allCoffee)
    let BRANDS_OPT
    if (coffee_b) {
        let coffee_brands = Object.values(coffee_b).map(obj => obj.Brand.name)
        let brand_set = new Set()
        coffee_brands.forEach(arr => brand_set.add(arr))
        BRANDS_OPT = Array.from(brand_set)
    }
    useEffect(() => {
        dispatch(loadAllCoffee())
    }, [dispatch])

    useEffect(() => {

        const errors = [];

        if (name.length && name.length < 2) {
            errors.push("Name must be at least 2 characters");
        }

        if (inventory && inventory < 12) {
            errors.push("Inventory must have at least 12 bags");
        }

        if (price && price < 2) {
            errors.push("Price must be at least $2/bag");
        }

        if (description.length && description.length < 5) {
            errors.push("Description must be at least 5 characters");
        }

        if (img_url && img_url.length < 1) {
            errors.push("Please include a preview image");
        }

        if (days.length && days.length < 1) {
            errors.push("Please include roasting schedule");
        }

        if (notes.length && notes.length !== 3) {
            errors.push("Please include 3 tasting notes");
        }

        setErrors(errors);
    }, [name, inventory, price, description, img_url, days, notes]);

    const submitCoffee = async (e) => {
        e.preventDefault();
        const newCoffee = {
            name,
            curator_id: user.id,
            inventory,
            origin,
            brand,
            roast,
            price: +price,
            description,
            img_url,
            days,
            notes
        }

        try {
            const createdCoffee = await dispatch(addOneCoffee(newCoffee))
            console.log("COMPONENT CREATED COFFEE", newCoffee)
            setErrors([])
            history.replace(`/cawfee/${createdCoffee.id}`)
        } catch (res) {
            console.log(res)
        }

    }
    if (!user || !user.curator) {
        return <Redirect to='/' />;
    }

    return (
        <div className='new-coffee-page-wrapper'>
            <div>
                Curate a New Coffee
            </div>
            <div>
                <form onSubmit={submitCoffee}>
                    <div>
                        {errors && errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>

                    <div>
                        <label htmlFor='name'>Coffee Name</label>
                        <input
                            name='name'
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor='brand'>Brand</label>
                        <select
                            name='brand'
                            required
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                        >
                            {BRANDS_OPT.map(note => (
                                <option value={note} key={note}>{note}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor='orgin'>Origin</label>
                        <select
                            name='origin'
                            required
                            value={origin}
                            onChange={e => setOrigin(e.target.value)}
                        >
                            {ORIGIN_OPT.map(str => (
                                <option value={str} key={str}>{str}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='roast'>Roast</label>
                        <select
                            name='roast'
                            required
                            value={roast}
                            onChange={e => setRoast(e.target.value)}
                        >
                            {ROAST_OPT.map(str => (
                                <option value={str} key={str}>{str}</option>
                            ))}
                        </select>
                    </div>

                    <div>Tasting Notes</div>

                    {NOTES_OPT.map(note => (
                        <div id='single-note' key={note}>
                            <input
                                type="checkbox"
                                className='add-coffee-form-note'
                                onChange={
                                    (e) => {
                                        const notesList = notes;
                                        if (e.target.checked) {
                                            notesList.push(e.target.value);
                                        }
                                        else {
                                            const i = notesList.indexOf(e.target.value);
                                            notesList.splice(i, 1);
                                        }
                                        setNotes(notesList);
                                    }
                                }
                                value={note}
                                name={note}
                            />
                            <label
                                htmlFor={note}
                                className='add-coffee-form-label'
                            >
                                {note}
                            </label>
                        </div>
                    ))}

                    <div>Roasting Schedule</div>

                    {DAYS_OPT.map(day => (
                        <div id='single-day' key={day}>
                            <input
                                type="checkbox"
                                className='add-coffee-form-day'
                                onChange={
                                    (e) => {
                                        const daysList = days;
                                        if (e.target.checked) {
                                            daysList.push(e.target.value);
                                        }
                                        else {
                                            const i = daysList.indexOf(e.target.value);
                                            daysList.splice(i, 1);
                                        }
                                        setDays(daysList);
                                    }
                                }
                                value={day}
                                name={day}
                            />
                            <label
                                htmlFor={day}
                                className='add-coffee-form-label'
                            >
                                {day}
                            </label>
                        </div>
                    ))}

                    <div>
                        <label htmlFor='price'>Price</label>
                        <input
                            name='price'
                            type='number'
                            min='2'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='inventory'>Inventory</label>
                        <input
                            name='inventory'
                            type='number'
                            min='12'
                            value={inventory}
                            onChange={e => setInventory(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Coffee Description</label>
                        <textarea
                            name='description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='img_url'>Preview Image</label>
                        <input
                            name='img_url'
                            type='text'
                            value={img_url}
                            onChange={e => setImg_Url(e.target.value)}
                        />
                    </div>
                    {img_url && <img className='add-coffee-preview_img_url' src={img_url} alt='img' onError={e => e.target.src = brokenImg} />}
                    <button
                        type="submit"
                        disabled={errors.length}
                        className='button button--submit'
                        id='login-button'
                    >
                        Submit
                    </button>
                </form>

            </div>

        </div>
    )
}