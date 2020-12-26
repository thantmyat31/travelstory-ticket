import React, {Component} from 'react';
import ReactToPrint from 'react-to-print';
import Button from '../Button/Button';

import { getDateTimeString, getDateTimeStringFromISO } from './../../utils/dateTime.utils';
import styles from './PrintableTable.module.css';


class PrintableTable extends Component {

    render () {
        const { ticket } = this.props;
        return ( 
            <>
                <table className={styles.table} ref={el => (this.componentRef = el)}>
                    <tbody>
                        <tr>
                            <td>Express Agency Name</td>
                            <td>{ticket?.tripId?.agency?.name}</td>
                        </tr>
                        <tr>
                            <td>Customer Name</td>
                            <td>{ticket?.contactInfo?.name}</td>
                        </tr>
                        <tr>
                            <td>Customer Phone</td>
                            <td>{ticket?.contactInfo?.phone}</td>
                        </tr>
                        <tr>
                            <td>From</td>
                            <td>{ticket?.cityFrom}</td>
                        </tr>
                        <tr>
                            <td>To</td>
                            <td>{ticket?.cityTo}</td>
                        </tr>
                        <tr>
                            <td>Sub Total</td>
                            <td>{ticket?.price} MMK</td>
                        </tr>
                        <tr>
                            <td>In Dollar</td>
                            <td>{ticket?.amount} USD</td>
                        </tr>
                        <tr>
                            <td>Seats Number</td>
                            <td>
                            {
                                ticket?.selectedSeats?.map((s, index) => index === ticket?.selectedSeats.length - 1? <b key={index}>{s}</b> : <b key={index}>{s}, </b>)
                            }
                            </td>
                        </tr>
                        <tr>
                            <td>Trip Code</td>
                            <td>{ticket?.tripId?.tripCode}</td>
                        </tr>
                        <tr>
                            <td>Trip Name</td>
                            <td>{ticket?.tripId?.tripName}</td>
                        </tr>
                        <tr>
                            <td>Bus Number</td>
                            <td>{ticket?.tripId?.busNumber}</td>
                        </tr>
                        <tr>
                            <td>Depart Date & Time</td>
                            <td>{getDateTimeString({date: ticket?.tripId?.depart?.date, time: ticket?.tripId?.depart?.time})}</td>
                        </tr>
                        <tr>
                            <td>Buy Date & Time</td>
                            <td>{getDateTimeStringFromISO(ticket?.createdAt)}</td>
                        </tr>
                    </tbody>
                </table>
                <ReactToPrint
                    trigger={() => {
                        return <Button title="Print Your Ticket" />;
                    }}
                    content={() => this.componentRef}
                />
            </>
        );
    }
}
 
export default PrintableTable;