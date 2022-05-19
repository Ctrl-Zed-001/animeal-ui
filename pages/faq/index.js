import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import { Collapse } from '@nextui-org/react'

const Faq = (props) => {
    return (
        <div className='faq-page mt-20 lg:mt-0'>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            <div className="container">
                <div className=" rounded-lg w-full p-4">

                    <Collapse.Group splitted>
                        <Collapse className='font-bold' expanded title="1.	Where does my delivery come from? ">
                            <p className='font-light'>Your product's delivery starts from our centralized warehouse in Sewree. We are always looking forward to providing you with excellent services so our team is constantly working with quicker deliveries. </p>
                        </Collapse>

                        <Collapse className='font-bold' title="2.	Any delivery charges or minimum order value?">
                            <ul className="list-disc pl-10 font-light">
                                <li>
                                    Absolutely not! Our main purpose is to help you in keeping your pet safe and healthy, so we don’t expect you to fill a required amount while buying quality medicines for your pet.
                                </li>
                                <li>
                                    As a customer-centric organization, there are no delivery charges too as our happiness ends with your pet’s happily wagging tail!
                                </li>
                            </ul>
                        </Collapse>

                        <Collapse className='font-bold' title="3.	How do I know the medicines are right? ">
                            <p className='font-light'>As a pet parent, it is natural to have such a concern but our team of pharmacists personally checks and verifies all the orders of medicines before delivery. Quality medicines are our responsibility. </p>
                        </Collapse>

                        <Collapse className='font-bold' title="4.	I can’t find my product on the website, what to do?">
                            <p className='font-light'>With over 4500 products of all ranges, it becomes difficult to update them online. Although do not worry, if you face any difficulty while searching for your product, we are always available to help out. Get in touch with us and we will arrange it for you.</p>
                        </Collapse>

                        <Collapse className='font-bold' title="5.	Are you veterinarians?">
                            <p className='font-light'>We understand having a good vet is a must but while we are not veterinarians, we can surely assist you to connect with some of the top vets from Mumbai. Reach us on 9004485093.</p>
                        </Collapse>

                        <Collapse className='font-bold' title="6.	Does my pet love me?">
                            <p className='font-light'>Well, we are 110% sure of the fact that your pet and you have an inseparable bond of love and it's one of the most precious feelings in the world. Keep on sharing those sweet cuddles and kisses to keep the bond alive. </p>
                        </Collapse>

                        <Collapse className='font-bold' title="7.	Do you sell pets?">
                            <p className='font-light'>It’s a big NO for us. Goodman vetcare believes in keeping adoption on priority and follows a “Adopt, don’t shop” policy. </p>
                            <p className='font-light'>However, stating the obvious there’s nothing as cuddly as a golden retriever or Gemini from a loving breeder. We are always there to hear you after you get your favourite pet home.</p>
                        </Collapse>

                        <Collapse className='font-bold' title="8.	Payment methods available? ">
                            <p className='font-light'>It's a hassle-free mode for our customers. Our website has all modes of payment from COD to any online payment. </p>
                        </Collapse>

                        <Collapse className='font-bold' title="9.	Handling returns">
                            <p className='font-light'>We have a firm trust that our customers are genuinely understanding. There’s no return and refund for any product purchased from us. If the product is opened or used, we won't be able to take it back. </p>
                        </Collapse>

                        <Collapse className='font-bold' title="10. What if I receive a damaged product?">
                            <p className='font-light'>We handle your products with utmost care and love while storing them in our warehouse, but as we know it’s almost impossible to control the inevitable.  A product might get damaged during packaging or transport.  </p>
                            <p className='font-light'>In that case, it’s all on us. Just send us a picture of the product on 90044865093 and we will process the return at the earliest</p>
                        </Collapse>

                    </Collapse.Group>

                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {

    let metaData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/metaurl/post/data`,
        {
            slug: "https://animeal.in" + context.resolvedUrl
        }
    )
    return {
        props: {
            title: metaData.data.success.meta_title,
            description: metaData.data.success.meta_description
        }
    }
}
export default Faq