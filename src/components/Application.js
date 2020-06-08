import React, {Component} from 'react';
import uniqueId from 'lodash/uniqueId';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';
import ItemsStore from "../ItemsStore";

import './Application.css';

class Application extends Component {
    state = {
        items: ItemsStore.getItems(),
    };

    markAllAsUnpacked = () => {
        /*        const items = this.state.items.map(item => ({...item, packed: false}));
                this.setState({items});*/
    };

    updateItems = () => {
        this.setState({items: ItemsStore.getItems()});
    };

    componentDidMount() {
        ItemsStore.on('change', this.updateItems);
    }

    componentWillUnmount() {
        ItemsStore.off('change', this.updateItems);
    }

    render() {
        const {items} = this.state;
        const unpackedItems = items.filter(item => !item.packed);
        const packedItems = items.filter(item => item.packed);

        return (
            <div className="Application">
                <NewItem />
                <CountDown {...this.state} />
                <Items
                    title="Unpacked Items"
                    items={unpackedItems}
                />
                <Items
                    title="Packed Items"
                    items={packedItems}
                />
                <button className="button full-width" onClick={this.markAllAsUnpacked}>
                    Mark All As Unpacked
                </button>
            </div>
        );
    }
}

export default Application;
