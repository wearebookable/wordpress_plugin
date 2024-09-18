import { useState } from 'react';
import {
	useBlockProps,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Button,
	ToolbarGroup,
	ToolbarButton,
	Notice,
	TextControl,
	ColorPalette,
} from '@wordpress/components';
import bookableIcon from './images/bookable.png';

const reservedSubdomains = [
	'dashboard',
	'auth',
	'api',
	'admin',
	'mail',
	'www',
	'wix',
	'wordpress',
	'squarespace',
];

const validateCustomUrl = ( url ) => {
	const urlRegex = /https:\/\/(.*?)\.wearebookable\.com/g;
	const subdomainRegex = /^https:\/\/([^.]+)\.wearebookable\.com/;

	if ( url && urlRegex.test( url ) ) {
		const matches = subdomainRegex.exec( url );

		return (
			matches !== null && ! reservedSubdomains.includes( matches[ 1 ] )
		);
	}

	return false;
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} props
 * @param {Object} props.attributes
 * @param {Object} props.setAttributes
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const [ bookableUrl, setBookableUrl ] = useState(
		attributes.customUrl || ''
	);
	const [ bookableUrlError, setBookableUrlError ] = useState( null );
	const [ borderColor, setBorderColor ] = useState(
		attributes.borderColor || '#E5E7EB'
	);

	const applyNewUrl = () => {
		if ( validateCustomUrl( bookableUrl ) ) {
			setBookableUrlError( null );
			setAttributes( { customUrl: bookableUrl } );
		} else {
			setBookableUrlError(
				'The URL you have entered is not a valid Bookable URL'
			);
		}
	};

	const applyNewBorderColor = ( hexColor ) => {
		setBorderColor( hexColor );
		setAttributes( { borderColor: hexColor } );
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="setting">
				<div className="container">
					<Notice status="info" isDismissible={ false }>
						<p>
							You can find your Bookable URL in the{ ' ' }
							<a
								href="https://dashboard.wearebookable.com"
								target="_blank"
								rel="noreferrer"
							>
								Bookable Dashboard
							</a>{ ' ' }
							under &apos;Account Settings&apos;.
						</p>
					</Notice>
					<div className="inspectorControls">
						<fieldset>
							<TextControl
								__nextHasNoMarginBottom
								label="Bookable URL"
								value={ bookableUrl }
								onChange={ ( value ) =>
									setBookableUrl( value )
								}
							/>
							{ bookableUrlError && (
								<div className="errorText">
									{ bookableUrlError }
								</div>
							) }
							<Button
								variant="primary"
								onClick={ applyNewUrl }
								className="applyButton"
							>
								Apply
							</Button>
						</fieldset>
						<fieldset>
							<label htmlFor="border-color-palette">
								Border Color
							</label>

							<ColorPalette
								id="border-color-palette"
								value={ borderColor }
								onChange={ applyNewBorderColor }
								clearable={ false }
							/>
						</fieldset>
					</div>
				</div>
			</InspectorControls>

			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton label="Bookable Dashboard">
						<a
							href="https://dashboard.wearebookable.com"
							target="_blank"
							rel="noreferrer"
							style={ { height: 24, width: 24, padding: 3 } }
						>
							<img alt="Bookable" src={ bookableIcon } />
						</a>
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>

			<div className="bookableContainer" style={ { borderColor } }>
				{ attributes.customUrl ? (
					<iframe title="Schedule" src={ attributes.customUrl } />
				) : (
					<div className="schedulePlaceholder">
						<div>
							Please set your Bookable URL in the Bookable widget
							settings to show your schedule.
						</div>
						<img
							src="https://bookable.ams3.cdn.digitaloceanspaces.com/brand/logo.png"
							style={ { height: 24 } }
							alt="Bookable"
						/>
					</div>
				) }
			</div>
		</div>
	);
}
