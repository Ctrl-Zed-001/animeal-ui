import React from 'react'
import axios from 'axios'
import Head from 'next/head'

const Terms = (props) => {
    return (
        <div className='terms-page'>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            <div className="container">
                <div className="bg-white rounded-lg w-full p-4">
                    <h1 className='font-semibold text-2xl'>Terms Of Use</h1>

                    <p>
                        Welcome to <a href="www.animeal.in">www.animeal.in</a>. Together with our Privacy Policy and Refund, Returns and Exchanges Policy, the following terms and conditions (collectively referred to as the Terms) govern the use of this website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the Terms, including but not limited to any additional or amended terms or conditions as applicable from time to time.
                    </p>

                    <p>
                        The term "Goodman Vetcare Pvt Ltd" or "us" or "we" or “Animeal” refers to the owner of the website whose registered office is Warehouse No - 501 5th floor Bharat industrial estate, Tokershi Jivraj Rd, Sewri, Mumbai, Maharashtra 400015. The term "you" refers to the user or viewer of our website. We reserve the right to amend the Terms in whole or in part, at any time, effective immediately upon posting on this website.
                    </p>

                    <h1 className='font-semibold text-2xl'>Authorised Website Visits</h1>

                    <p>
                        By accessing and using this website you agree that you are legally able to enter into binding contracts within the realms of the Indian Contract Act 1872.
                    </p>

                    <h1 className='font-semibold text-2xl'>Authorised Website Visits</h1>

                    <p>
                        The content on this website is for your general information and personal use only. It is subject to change without notice. You agree to refrain from the following:
                        <ul>
                            <li>Reproducing, altering, modifying, distributing, publicly publishing, scraping or making any commercial use of any of the information provided in this website. This includes using any robot, spider, other automatic devices, or manual process to monitor or copy any part of the website or for any unauthorized purpose without our prior expressed written permission;
                            </li>
                            <li>Distributing in any form, any information, or other material that violates, infringes the copyrights, patents, trademarks, trade secrets, logo or other proprietary rights of Animeal;
                            </li>
                            <li>Republishing, archiving or retaining any content of the website via any medium without our prior expressed written permission;
                            </li>
                            <li>Manipulating any aspect of the website without our prior expressed written permission including using any device, software or routine to interfere or attempt to interfere with the proper working of the Website; and
                            </li>
                            <li>Using the website in any manner that is illegal, including but not limited to, unauthorized framing of or linking to the website, or unauthorized use of any robot, spider or other automated devices on the website.
                            </li>
                        </ul>
                    </p>

                    <h1 className='font-semibold text-2xl'>Accuracy of content</h1>

                    <p>
                        All prices on the website are displayed in Indian Rupees and are current at the time of display. However, these prices are subject to change without notice.
                    </p>

                    <p>
                        Animeal makes every effort to display product information and pricing as accurately as possible. However, neither we nor any third parties provide any warranty or guarantee as to the accuracy, reliability, availability, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                    </p>

                    <p>
                        At times, there can be discrepancies with the product descriptions which are inadvertent and unintentional. If a product offered by Animeal is not as described, your sole remedy is to return the product and avail a store credit.
                    </p>

                    <h1 className='font-semibold text-2xl'>Intellectual property</h1>

                    <p>
                        This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. All trademarks reproduced in this website which is not the property of, or licensed to, Animeal are acknowledged on the website.
                    </p>

                    <h1 className='font-semibold text-2xl'>Links to other sites</h1>

                    <p>
                        From time to time this website may also include links to other web sites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked web site(s).
                    </p>

                    <h1 className='font-semibold text-2xl'>Animeal Account</h1>

                    <p>
                        You can choose to sign up for an account with Animeal. By signing up for an account with Animeal, you agree to be automatically enrolled in the Animeal Perks program, the terms of which are outlined below.
                    </p>

                    <p>
                        You are solely responsible for all access to and use of this website by anyone using your account credentials, whether or not such access to and use of this website (including all obligations, communications, and transmissions) has been authorized by you. As such, you agree to accept responsibility for all activities that occur under your account.
                    </p>

                    <p>
                        Animeal has no obligation to investigate the authorization or source of any such access or use of the website. You shall immediately notify Animeal of any unauthorized use of your password or identification or any other breach or threat to this website's security.
                    </p>

                    <p>
                        Animeal reserves the right to refuse service, terminate accounts, and/or cancel orders at its discretion, including, without limitation, if Animeal believes that the conduct by the customer violates applicable law or is harmful to the website.
                    </p>

                    <h1 className='font-semibold text-2xl'>Privacy</h1>

                    <p>
                        Animeal only collects your Personal Information to conduct its business and to enable itself to deliver and improve its Services. Refer to our Privacy Policy, which forms part of our terms of use, for further detail.
                    </p>

                    <h1 className='font-semibold text-2xl'>Cancellations</h1>

                    <p>
                        Animeal has a right to cancel or refuse the order for any reason including, limitations on quantities available for purchase. In the event, we require additional verification or information before accepting and processing your order, or if all or any portion of your order is canceled, we will contact you.
                    </p>

                    <p>
                        Refer to our Refund, Returns and Exchanges Policy, which forms part of our terms of use, for further detail.
                    </p>

                    <h1 className='font-semibold text-2xl'>Disclaimer and Indemnification</h1>

                    <p>
                        Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
                    </p>

                    <p>
                        You hereby indemnify, defend, and hold us and our affiliates and our officers, directors, owners, agents, information providers, affiliates, licensors and licensees harmless from and against any and all liabilities and costs incurred in connection with any claim arising out of any breach by you of this agreement or claims arising from your use of our website. You shall cooperate with us in the defense of any claim. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you.
                    </p>

                    <p>
                        Unauthorized use of this web site including fraudulent use may give rise to a claim for damages and/or be a criminal offense.
                    </p>

                    <h1 className='font-semibold text-2xl'>Jurisdiction and Governing Law</h1>

                    <p>
                        Your use of this website and any dispute arising out of such use of the website is subject to the Indian law, which shall be resolved under the exclusive jurisdiction of the courts of Mumbai. All rights not expressly granted herein are reserved.
                    </p>

                    <h1 className='font-semibold text-2xl'>Termination</h1>

                    <p>
                        Your failure to comply with the Terms automatically revokes your authorization to use the website.
                    </p>



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

export default Terms