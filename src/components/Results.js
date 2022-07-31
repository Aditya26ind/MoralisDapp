import { Card ,Rate} from 'antd';
import { book } from "../books.js"
import {Link} from "react-router-dom"
import "./Results.css"

function Results({ category, rating, priceMin, priceMax }) {
    const bookCategory = book[category].filter(x => x.rating >= rating).filter(x => x.price > priceMin).filter(x => x.price <= priceMax);
    console.log(bookCategory);
    return (
        <>
            {bookCategory.map((e, i) => {
                return (
                    <Card>
                        <div style={{ display: "flex" }}>
                            <img src={e.image} alt={i} width="300px"></img>
                            <div>
                                <p className="title">
                                    {e.name}
                                </p>
                                <Rate value={e.rating} disabled={true}></Rate>
                                <h2> ${e.price}</h2>
                                <p>Ships to your Location</p>
                                <Link to="/product" state={e} className="login">
                                    Go to product page
                                </Link>

                            </div>
                        </div>
                    </Card>
                );
            })}
        </>
    )
}

export default Results