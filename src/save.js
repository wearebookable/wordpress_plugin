import { useBlockProps } from '@wordpress/block-editor';
import bookableIcon from './images/bookable.png';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props
 * @param {Object} props.attributes
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const { customUrl, borderColor } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<div
				className="bookableContainer"
				style={ { borderColor: borderColor || '#E5E7EB' } }
			>
				{ customUrl ? (
					<iframe title="Schedule" src={ customUrl } />
				) : (
					<div className="schedulePlaceholder">
						<div>
							Please set your Bookable URL in the Bookable widget
							settings to show your schedule.
						</div>
						<img
							src={ bookableIcon }
							style={ { height: 24 } }
							alt="Bookable"
						/>
					</div>
				) }
			</div>
		</div>
	);
}
