import { useEffect, useState } from "react";
import { NavLink, useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadAllCoffee, getOneCoffee, editOneCoffee } from "../../store/coffee";
import brokenImg from '../../icons/broken-img.png'
import noImg from '../../icons/no_image.svg'

// import './newCoffee.css'

export default function EditCoffee() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { coffeeId } = useParams()

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
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState('SUBMIT')

    const [onSubmit, setOnSubmit] = useState(false)
    const [refreshChecks, setRefreshChecks] = useState(false)


    const user = useSelector(state => state.session.user)
    const coffee_b = useSelector(state => state.coffee.allCoffee)
    const singleCoffee = useSelector(state => state.coffee.singleCoffee)

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
    const ORIGIN_OPT = ['Brazil', 'Burundi', 'Colombia', 'Congo', 'Costa Rica',
        'El Salvador', 'Ethiopia', 'Guatemala', 'Honduras', 'Indonesia', 'Kenya',
        'Mexico', 'Nicaragua', 'Panama', 'Papua New Guinea', 'Peru', 'Rwanda', 'Sulawesi',
        'Sumatra', 'Tanzania', 'Uganda', 'Various (Blend)']
    const ROAST_OPT = ['Light', 'Medium', 'Dark']

    let BRANDS_OPT
    if (coffee_b) {
        let coffee_brands = Object.values(coffee_b).map(obj => obj.Brand.name)
        let brand_set = new Set()
        coffee_brands.forEach(arr => brand_set.add(arr))
        BRANDS_OPT = Array.from(brand_set)
    }
    useEffect(() => {
        dispatch(loadAllCoffee())
        dispatch(getOneCoffee(coffeeId))
    }, [dispatch, coffeeId])

    useEffect(() => {
        const refreshNoteArr = [...notes]
        const refreshDaysArr = [...days]
        setNotes(refreshNoteArr)
        setDays(refreshDaysArr)
    }, [dispatch, refreshChecks])



    useEffect(() => {
        const errors = [];

        if (name && name.length < 2) {
            errors.push("Name must be at least 2 characters");
        }

        if (inventory && inventory < 10) {
            errors.push("Inventory must have at least 12 bags");
        }

        if (price && price < 2) {
            errors.push("Price must be at least $2/bag");
        }

        if (description && description.length < 5) {
            errors.push("Description must be at least 5 characters");
        }

        if (img_url && img_url.length < 1) {
            errors.push("Please include a preview image");
        }

        if (days && days.length < 1) {
            errors.push("Please include roasting schedule");
        }

        if (notes && notes.length !== 3) {
            errors.push("Please include 3 tasting notes");
        }
        setErrors(errors);
    }, [name, inventory, price, description, img_url, days, notes, notes.length]);


    // console.log("ERRORS", errors)
    useEffect(() => {
        if (singleCoffee) {
            setName(singleCoffee.name);
            setBrand(brandVar);
            setOrigin(singleCoffee.origin);
            setRoast(singleCoffee.roast && singleCoffee.roast[0].toUpperCase() + singleCoffee.roast.slice(1));
            setInventory(singleCoffee.inventory);
            setPrice(singleCoffee.price);
            setDescription(singleCoffee.description);
            setImg_Url(singleCoffee.img_url);

            const currDays = []
            if (singleCoffee.days && singleCoffee.days.length > 0) {
                singleCoffee.days.forEach(day => {
                    currDays.push(day.day);
                });
            }
            setDays(currDays);

            const currNotes = []
            if (singleCoffee.notes && singleCoffee.notes.length > 0) {
                singleCoffee.notes.forEach(note => {
                    currNotes.push(note.note);
                });
            }
            setNotes(currNotes);
        }
    }, [singleCoffee]);

    useEffect(() => {
        const prevDays = document.querySelectorAll('#edit-coffee-day')
        days.forEach(day => {
            prevDays.forEach(prevDay => {
                if (prevDay.value === day) prevDay.checked = true;
            })
        })
        const prevNotes = document.querySelectorAll('#edit-coffee-note')
        notes.forEach(note => {
            prevNotes.forEach(prevNote => {
                if (prevNote.value === note) prevNote.checked = true;
            })
        })
    }, [days, notes, singleCoffee])

    let brandVar
    if (singleCoffee.Brand) {
        brandVar = singleCoffee.Brand.name
    }
    const updateImage = (e) => {
        const file = e.target.files[0];
        // console.log("FILES", e.target.files)
        // console.log("FILE", file)
        setImage(file);
    }


    const submitCoffee = async (e) => {
        e.preventDefault();
        setOnSubmit(true)
        if (errors.length > 0) {
            return;
        }

        const formData = new FormData()
        // console.log("IMAGE", image)
        if (image) {
            formData.append("image", image)
        }
        else {
            formData.append("img_url", img_url)
        }
        formData.append("name", name)
        formData.append("curator_id", user.id)
        formData.append("inventory", inventory)
        formData.append("origin", origin)
        formData.append("brand", brand)
        formData.append("roast", roast)
        formData.append("price", +price)
        formData.append("description", description)
        formData.append("days", days)
        formData.append("notes", notes)

        // const newCoffee = {
        //     name,
        //     curator_id: user.id,
        //     inventory,
        //     origin,
        //     brand,
        //     roast,
        //     price: +price,
        //     description,
        //     img_url,
        //     days,
        //     notes
        // }

        try {
            // const createdCoffee = await dispatch(editOneCoffee(coffeeId, newCoffee))
            const response = await fetch(`/api/coffee/${coffeeId}`, {
                method: 'PUT',
                // headers: {
                //     'Content-Type': 'application/json'
                //         },
                // body: JSON.stringify(coffee)
                body: formData

            });
            setLoading("LOADING...")
            setErrors([])
            // console.log("RESPONSE", await response.json())
            history.replace(`/cawfee/${coffeeId}`)
        } catch (res) {
            setLoading("SUBMIT")
            console.log(res)
        }

    }
    if (!user || !user.curator || (singleCoffee.curator_id && singleCoffee.curator_id !== user.id)) {
        return <Redirect to='/' />;
    }

    return (
        <div className='new-coffee-page-wrapper'>
            <div className='new-coffee-page-title'>
                Edit {singleCoffee.name && singleCoffee.name} Details
            </div>
            <div className='new-coffee-form-wrapper'>
                <form onSubmit={submitCoffee}>
                    {/* <div className='new-coffee-form-errors'>
                        {errors && errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div> */}

                    <div className='coffee-input-wrapper'>
                        {onSubmit && (name.length < 2 || name.length > 30) && <div className='new-coffee-form-error'>Name must be at least 2 characters</div>}
                        {!onSubmit && name && name.length < 2 && <div className='new-coffee-form-error'>Name must be at least 2 characters</div>}
                        {name && name.length > 30 && <div className='new-coffee-form-error'>Name can not exceed 30 characters</div>}
                        <label className='coffee-input-label' htmlFor='name'>Coffee Name</label>
                        <input
                            name='name'
                            autoComplete="off"
                            className='new-coffee-input'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className='coffee-input-wrapper'>
                        <label className='coffee-input-label' htmlFor='brand'>Brand</label>
                        <select
                            name='brand'
                            required
                            className='new-coffee-select'
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                        >
                            {BRANDS_OPT.map(note => (
                                <option value={note} key={note}>{note}</option>
                            ))}
                        </select>
                    </div>

                    <div className='coffee-input-wrapper'>
                        <label className='coffee-input-label' htmlFor='orgin'>Origin</label>
                        <select
                            name='origin'
                            required
                            className='new-coffee-select'
                            value={origin}
                            onChange={e => setOrigin(e.target.value)}
                        >
                            {ORIGIN_OPT.map(str => (
                                <option value={str} key={str}>{str}</option>
                            ))}
                        </select>
                    </div>
                    <div className='coffee-input-wrapper'>
                        <label className='coffee-input-label' htmlFor='roast'>Roast</label>
                        <select
                            name='roast'
                            required
                            className='new-coffee-select'
                            value={roast}
                            onChange={e => setRoast(e.target.value)}
                        >
                            {ROAST_OPT.map(str => (
                                <option value={str} key={str}>{str}</option>
                            ))}
                        </select>
                    </div>
                    {onSubmit && notes.length !== 3 && <div className='new-coffee-form-error-lonely-div'>Please include 3 notes</div>}
                    <div className='coffee-input-label lonely-div'>With Notes Of (Select 3)</div>
                    <div className='coffee-input-checkboxes-wrapper'>

                        {NOTES_OPT.map(note => (
                            <div id='single-note' key={note} onClick={() => setRefreshChecks(!refreshChecks)}>
                                <input
                                    type="checkbox"
                                    id='edit-coffee-note'
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
                                <label className='coffee-input-label'
                                    htmlFor={note}
                                // className='add-coffee-form-label'
                                >
                                    {note}
                                </label>
                            </div>
                        ))}
                    </div>
                    {onSubmit && days.length < 1 && <div className='new-coffee-form-error-lonely-div'>Please include a roasting schedule</div>}


                    <div className='coffee-input-label lonely-div' >Roasting Schedule</div>
                    <div className='coffee-input-checkboxes-wrapper'>
                        {DAYS_OPT.map(day => (
                            <div id='single-day' key={day} onClick={() => setRefreshChecks(!refreshChecks)} >
                                <input
                                    type="checkbox"
                                    id='edit-coffee-day'
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
                                <label className='coffee-input-label'
                                    htmlFor={day}
                                // className='add-coffee-form-label'
                                >
                                    {day}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className='coffee-input-wrapper'>
                        {onSubmit && price < 2 && <div className='new-coffee-form-error'>Price must be at least $2/bag</div>}
                        {!onSubmit && price && price < 2 && <div className='new-coffee-form-error'>Price must be at least $2/bag</div>}
                        <label className='coffee-input-label' htmlFor='price'>Price ($USD/bag)</label>
                        <input
                            name='price'
                            type='number'
                            inputMode="numeric"
                            autoComplete="off"
                            className='new-coffee-input'
                            min='2'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='coffee-input-wrapper'>
                        <label className='coffee-input-label' htmlFor='inventory'>Inventory (bags)</label>
                        {onSubmit && inventory < 10 && <div className='new-coffee-form-error'>Inventory must include at least 10 bags</div>}
                        {!onSubmit && inventory && inventory < 10 && <div className='new-coffee-form-error'>Inventory must include at least 10 bags</div>}
                        <input
                            name='inventory'
                            type='number'
                            className='new-coffee-input'
                            autoComplete="off"
                            min='10'
                            value={inventory}
                            onChange={e => setInventory(e.target.value)}
                        />
                    </div>
                    <div className='coffee-input-wrapper'>
                        {onSubmit && description.length < 5 && <div className='new-coffee-form-error'>Description must be at least 5 characters</div>}
                        {onSubmit && description.length > 750 && <div className='new-coffee-form-error'>Description must not exceed 750 characters</div>}
                        {!onSubmit && description && description.length < 5 && <div className='new-coffee-form-error'>Description must be at least 5 characters</div>}
                        {!onSubmit && description && description.length > 750 && <div className='new-coffee-form-error'>Description must not exceed 750 characters</div>}
                        <label className='coffee-input-label' htmlFor='description'>Coffee Description</label>
                        <textarea
                            name='description'
                            autoComplete="off"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='coffee-input-wrapper'>
                        {onSubmit && img_url.length < 1 && <div className='new-coffee-form-error'>Please provide a preview image URL</div>}
                        {!onSubmit && img_url && img_url.length < 1 && <div className='new-coffee-form-error'>Please provide a preview image URL</div>}

                        <label className='coffee-input-label' htmlFor='img_url'>Update Preview Image</label>
                        <input
                            name='img_url'
                            type='file'
                            // autoComplete="off"
                            className='new-coffee-input'
                            // value={img_url}
                            onChange={updateImage}
                        />
                    </div>
                    <label className='coffee-input-label' htmlFor='img_url'>Current Preview Image</label>
                    <div className='coffee-input-prev-img'>
                        {img_url && <img className='add-coffee-preview_img_url' src={img_url} alt='img' onError={e => e.target.src = noImg} />}
                    </div>
                    <button
                        type="submit"
                        // disabled={errors.length}
                        id='login-button'
                    >
                        {loading}
                    </button>
                    {onSubmit && errors.length > 0 && <div style={{ textAlign: 'center' }} className='new-coffee-form-error'>Unable to submit curation. Please address the above errors.</div>}
                </form>

            </div>

        </div>
    )
}