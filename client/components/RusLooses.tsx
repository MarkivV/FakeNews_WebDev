import React from 'react';
import styles from './../styles/RusLooses.module.scss'
import {Looses} from "../types/types";

const RusLosses: React.FC<Looses> = ({looses}) => {
    const list = [
        {
            title: 'Особивий склад',
            value: looses?.personnel_units
        }, {
            title: 'Літаки',
            value: looses?.planes
        }, {
            title: 'Гелікоптери',
            value: looses?.helicopters
        }, {
            title: 'Танки',
            value: looses?.tanks
        }, {
            title: 'Броньовики',
            value: looses?.armoured_fighting_vehicles
        }, {
            title: 'Системи артилерії',
            value: looses?.artillery_systems
        }, {
            title: 'Засоби ППО',
            value: looses?.aa_warfare_systems
        }, {
            title: 'РСЗВ',
            value: looses?.mlrs
        }, {
            title: 'Автотехніка',
            value: looses?.vehicles_fuel_tanks
        }, {
            title: 'Спецтехніка',
            value: looses?.special_military_equip
        }, {
            title: 'БПЛА ОТР',
            value: looses?.uav_systems
        }, {
            title: 'Кораблі і катери',
            value: looses?.warships_cutters
        },

    ]
    return (
        <div className={styles.rus_losses}>
            <div className={styles.title_losses}>
                <h3>Актуальні втрати країни загарбника</h3>
            </div>
            <div className={styles.losses_list_map}>
                {
                    list?.map((item, index) => (
                        <div className={styles.losses_list} key={index}>
                            <h3 className={styles.counter}>{item?.value}</h3>
                            <h3 className={styles.name}>{item?.title}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};



export default RusLosses;


// 'Особивий склад',
// 'Літаки',
// 'Гелікоптери',
// 'Танки',
// 'Броньовики',
// 'Системи артилерії',
// 'Засоби ППО',
// 'РСЗВ',
// 'Автотехніка',
// 'Спетехніка',
// 'БПЛА ОТР',
// 'Кораблі і катери'