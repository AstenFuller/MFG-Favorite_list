import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, { updateProperties, dispatch }) => {
	function clickedFavorite(item) {
		if (Object.keys(selectedItem).length > 0 && selectedItem.sys_id == item.sys_id) {
			updateProperties({selectedItem: {}})
		} else {
			updateProperties({selectedItem: item})
		}

		dispatch('CLICKED_FAVORITE', { item });
	};
	function clickedRemove(item) {
		dispatch('CLICKED_REMOVE', { item });
	};

	const { items, selectedItem } = state;
	return (
		<div className='mfg-favorites-list'>
			{
				items.map((item, i ) => {
					return (
						<div key={i} className={`mfg-favorite-item mfg-clickable ${selectedItem && selectedItem.sys_id == item.sys_id ? 'selected' : ''}`} on-click={() => clickedFavorite(item)}>
							<span className='mfg-favorite-item-label'>{item.label}</span>
							<span className='mfg-clickable item-remove' on-click={() => clickedRemove(item)}>x</span>
						</div>
					)
				})
			}
		</div>
	);
};

createCustomElement('snc-mfg-favorite-locations', {
	renderer: {type: snabbdom},
	transformState(state) {
		const { properties } = state;
		return properties;
	},
	view,
	properties: {
		items: { default: [ { sys_id: 'test_sys_id', label: 'Test Label' } ] },
		selectedItem: { default: {} }
	},
	styles
});
