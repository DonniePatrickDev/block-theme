(function (blocks, editor, components, i18n, element) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var ToggleControl = components.ToggleControl
  var RangeControl = components.RangeControl
  var ColorPicker = components.ColorPicker
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
  var UnitControl = components.__experimentalUnitControl
  var BaseControl = components.BaseControl
  var PanelBody = components.PanelBody

  // Dropdown Options
  var obbColors = [
    { name: __('White', 'obb'), color: '#fff' },
    { name: __('Black', 'obb'), color: '#000' },
    { name: __('Light Gray', 'obb'), color: '#eee' },
    { name: __('Medium Gray', 'obb'), color: '#808080' },
    { name: __('Brown', 'obb'), color: '#996633' },
    { name: __('Red', 'obb'), color: '#f00' },
    { name: __('Blue', 'obb'), color: '#006699' },
    { name: __('Green', 'obb'), color: '#99cc33' },
    { name: __('Pink', 'obb'), color: '#ff33cc' },
    { name: __('Teal', 'obb'), color: '#00cccc' },
    { name: __('Gold', 'obb'), color: '#cc9900' },
    { name: __('Purple', 'obb'), color: '#660099' }
  ]
  var gradientOptions = [
    {
      name: 'Midnight Hour',
      gradient: 'linear-gradient(180deg, rgb(0, 5, 80), rgb(124, 0, 163) 100%)',
      slug: 'midnight-hour'
    },
    {
      name: 'California Dusk',
      gradient: 'linear-gradient(225deg, rgb(223, 212, 0), rgb(156, 0, 163) 100%)',
      slug: 'california-dusk'
    },
    {
      name: 'Subtle Teal',
      gradient: 'linear-gradient(135deg, rgb(0, 219, 255), rgb(0, 197, 93) 100%)',
      slug: 'subtle-teal'
    },
    {
      name: 'Tokyo Sunset',
      gradient: 'linear-gradient(135deg, rgb(255, 0, 116), rgb(0, 40, 205) 100%)',
      slug: 'tokyo-sunset'
    },
    {
      name: 'Fire Blaze',
      gradient: 'linear-gradient(135deg, rgb(244, 182, 0), rgb(200, 0, 0) 100%)',
      slug: 'fire-blaze'
    },
    {
      name: 'Lime Light',
      gradient: 'linear-gradient(320deg, rgb(151, 236, 5), rgb(251, 230, 0) 100%)',
      slug: 'lime-light'
    }
  ]
  var unitTypes = [
    { value: 'px', label: 'px', default: 0 },
    { value: '%', label: '%', default: 10 },
    { value: 'em', label: 'em', default: 0 }
  ]
  var alertTemplate = [
    ['core/paragraph', { placeholder: 'Enter your alert content.', fontSize: 'medium' }]
  ]

  // Create custom alert icon SVG.
  const alertIcon = el('svg',
    {
      class: 'organic-alert-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M20.347 18.063c-1.069-0.394-1.666-1.15-2-2.525-0.347-1.434-0.347-3.334-0.347-5.538 0-1.603-0.625-3.109-1.756-4.244-0.647-0.647-1.419-1.128-2.256-1.422-0.025-0.462-0.091-0.925-0.263-1.306-0.306-0.681-0.884-1.028-1.725-1.028s-1.419 0.347-1.725 1.028c-0.172 0.381-0.237 0.844-0.262 1.306-0.841 0.294-1.609 0.775-2.256 1.422-1.131 1.134-1.756 2.641-1.756 4.244 0 2.203 0 4.103-0.347 5.538-0.334 1.375-0.931 2.131-2 2.525-0.394 0.144-0.653 0.519-0.653 0.938v2c0 0.553 0.447 1 1 1h6c0 1.103 0.897 2 2 2s2-0.897 2-2h6c0.553 0 1-0.447 1-1v-2c0-0.419-0.263-0.794-0.653-0.938zM12 3c0.578 0 0.862 0.184 0.959 1.075-0.316-0.050-0.634-0.075-0.959-0.075s-0.647 0.025-0.959 0.075c0.097-0.891 0.381-1.075 0.959-1.075zM12 23c-0.55 0-1-0.45-1-1h2c0 0.55-0.45 1-1 1zM19 20h-14v-0.353c1.322-0.697 2.175-1.894 2.597-3.641 0.403-1.662 0.403-3.675 0.403-6.006 0-2.206 1.794-4 4-4s4 1.794 4 4c0 2.331 0 4.344 0.403 6.009 0.422 1.747 1.275 2.944 2.597 3.641v0.35z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M9 10v2h1v-2c0-1.103 0.897-2 2-2v-1c-1.653 0-3 1.347-3 3z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M17.825 3.138l-0.381-0.325-0.647 0.762 0.381 0.325c1.794 1.525 2.822 3.747 2.822 6.1v2h1v-2c0-2.647-1.156-5.147-3.175-6.863z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M3 12h1v-2c0-2.353 1.028-4.575 2.825-6.1l0.381-0.325-0.647-0.762-0.381 0.325c-2.022 1.716-3.178 4.216-3.178 6.863v2z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M22.906 4.988c-0.7-1.522-1.697-2.862-2.956-3.978l-0.375-0.331-0.663 0.75 0.375 0.331c2.359 2.088 3.713 5.091 3.713 8.241v2h1v-2c0-1.75-0.369-3.434-1.094-5.013z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M4.716 1.759l0.375-0.331-0.663-0.75-0.375 0.331c-1.263 1.116-2.256 2.453-2.959 3.978-0.725 1.575-1.094 3.262-1.094 5.013v2h1v-2c0-3.15 1.353-6.153 3.716-8.241z'
        }
      )
    )
  )

  const organicAlertBlock = registerBlockType('obb/alert-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Alert', 'obb'), // The title of our block.
    description: __('Create content within a dismissible alert box.', 'obb'), // The description of our block.
    icon: alertIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
      align: true,
      alignWide: true,
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: true // Enable padding UI control.
      }
    },
    styles: [
      {
        name: 'obb-default',
        label: __('Default Icon', 'obb'),
        isDefault: true
      },
      {
        name: 'obb-modern',
        label: __('Square Icon', 'obb')
      },
      {
        name: 'obb-bordered',
        label: __('Outline Icon', 'obb')
      },
      {
        name: 'obb-rounded',
        label: __('Round Icon', 'obb')
      }
    ],
    attributes: { // Necessary for saving block content.
      styleradius: {
        type: 'number',
        default: 3
      },
      styleshadow: {
        type: 'number',
        default: 12
      },
      styleborderwidth: {
        type: 'number',
        default: 2
      },
      stylebordercolor: {
        type: 'string',
        default: '#78c026'
      },
      styleshadowcolor: {
        type: 'string'
      },
      displayabove: {
        type: 'boolean',
        default: false
      },
      displaypopup: {
        type: 'boolean',
        default: false
      },
      displayoverlay: {
        type: 'boolean',
        default: true
      },
      contentwidth: {
        type: 'string'
      },
      contentpadding: {
        type: 'string',
        default: '24px'
      },
      iconcolor: {
        type: 'string'
      },
      bgcolor: {
        type: 'string',
        default: '#ecf8d5'
      },
      bggradient: {
        type: 'string'
      },
      overlaybgcolor: {
        type: 'string',
        default: '#000'
      },
      overlaybggradient: {
        type: 'string'
      },
      overlayopacity: {
        type: 'number',
        default: 0.6
      }
    },
    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var displayabove = props.attributes.displayabove
      var displaypopup = props.attributes.displaypopup
      var displayoverlay = props.attributes.displayoverlay
      var contentwidth = props.attributes.contentwidth
      var contentpadding = props.attributes.contentpadding
      var iconcolor = props.attributes.iconcolor
      var bgcolor = props.attributes.bgcolor
      var bggradient = props.attributes.bggradient
      var overlaybgcolor = props.attributes.overlaybgcolor
      var overlaybggradient = props.attributes.overlaybggradient
      var overlayopacity = props.attributes.overlayopacity

      return [
        el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
          el(PanelBody,
            {
              title: __('Settings', 'obb')
            },
            el(ToggleControl, {
              label: __('Display Alert Popup', 'obb'),
              // help: __('Display alert above content on page load.', 'obb'),
              checked: displayabove,
              onChange: function (val) { props.setAttributes({ displayabove: val }) }
            }),
            (displayabove === true) && (
              el(ToggleControl, {
                label: __('Display Popup On Browser Exit', 'obb'),
                checked: displaypopup,
                onChange: function (val) { props.setAttributes({ displaypopup: val }) }
              })
            ),
            (displayabove === true) && (
              el(ToggleControl, {
                label: __('Display Background Overlay', 'obb'),
                checked: displayoverlay,
                onChange: function (val) { props.setAttributes({ displayoverlay: val }) }
              })
            ),
            el(BaseControl,
              {
                help: __('Set maximum width for alert content.', 'obb')
              },
              el(UnitControl, {
                label: __('Alert Width', 'obb'),
                type: 'number',
                units: unitTypes,
                value: contentwidth,
                onChange: function (val) { props.setAttributes({ contentwidth: val }) }
              })
            ),
            el(BaseControl,
              {
                help: __('Set inner padding for alert content.', 'obb')
              },
              el(UnitControl, {
                label: __('Alert Padding', 'obb'),
                type: 'number',
                units: unitTypes,
                value: contentpadding,
                onChange: function (val) { props.setAttributes({ contentpadding: val }) }
              })
            )
          ),
          el(PanelColorSettings, {
            title: __('Background', 'obb'),
            initialOpen: true,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                label: __('Background Color', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: bgcolor,
                gradientValue: bggradient,
                onChange: function (val) { props.setAttributes({ bgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ bggradient: val }) }
              },
              {
                label: __('Overlay Color', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: overlaybgcolor,
                gradientValue: overlaybggradient,
                onChange: function (val) { props.setAttributes({ overlaybgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ overlaybggradient: val }) }
              },
              {
                label: __('Close Icon Color', 'obb'),
                colors: colorOptions,
                value: iconcolor,
                onChange: function (val) { props.setAttributes({ iconcolor: val }) }
              },
              {
                label: __('Border Color', 'obb'),
                colors: colorOptions,
                value: stylebordercolor,
                onChange: function (val) { props.setAttributes({ stylebordercolor: val }) }
              },
              {
                label: __('Shadow Color', 'obb'),
                colors: colorOptions,
                value: styleshadowcolor,
                onChange: function (val) { props.setAttributes({ styleshadowcolor: val }) }
              }
            ]
          },
          el(RangeControl, {
            label: __('Overlay Opacity', 'obb'),
            max: 1.0,
            min: 0.0,
            step: 0.1,
            value: overlayopacity,
            onChange: function (val) { props.setAttributes({ overlayopacity: val }) }
          }),
          el(RangeControl, {
            label: __('Border Radius', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 100,
            step: 1,
            value: styleradius,
            onChange: function (val) { props.setAttributes({ styleradius: val }) }
          }),
          el(RangeControl, {
            label: __('Border Width', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 20,
            step: 1,
            value: styleborderwidth,
            onChange: function (val) { props.setAttributes({ styleborderwidth: val }) }
          }),
          el(RangeControl, {
            label: __('Shadow Size', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 100,
            step: 1,
            value: styleshadow,
            onChange: function (val) { props.setAttributes({ styleshadow: val }) }
          })
          )
        ),
        el('div',
          {
            className: 'organic-block obb-alert-box' + ' ' + props.className,
            style: {
              maxWidth: attributes.contentwidth !== '' ? attributes.contentwidth : null,
              padding: attributes.contentpadding !== '' ? attributes.contentpadding : '24px',
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : '#ecf8d5',
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el('button',
            {
              className: 'obb-alert-close'
            },
            el('i', { className: 'obb-alert-icon fas fa-times', style: { color: attributes.iconcolor ? attributes.iconcolor : null } })
          ),
          el('div',
            {
              className: 'obb-alert-content'
            },
            el(InnerBlocks, { template: alertTemplate }
            )
          )
        )
      ]
    },

    example: function () {},

    save: function (props) {
      var attributes = props.attributes

      var aboveContent = ''

      if (attributes.displayabove === true) {
        aboveContent = ' obb-alert-above'
      }

      var alertPopup = ''

      if (attributes.displayabove === true && attributes.displaypopup === true) {
        alertPopup = ' obb-alert-popup'
      }

      var alertOverlay = ''

      if (attributes.displayabove === true && attributes.displayoverlay === true) {
        alertOverlay = el('div', {
          className: 'obb-alert-overlay',
          style: {
            backgroundColor: attributes.overlaybgcolor ? attributes.overlaybgcolor : '#000',
            backgroundImage: attributes.overlaybggradient ? attributes.overlaybggradient : null,
            opacity: attributes.overlayopacity
          }
        })
      }

      return (
        el('div',
          {
            className: 'organic-block obb-alert' + alertPopup
          },
          el('div',
            {
              className: 'obb-alert-box' + aboveContent,
              style: {
                maxWidth: attributes.contentwidth !== '' ? attributes.contentwidth : null,
                padding: attributes.contentpadding !== '' ? attributes.contentpadding : '24px',
                backgroundColor: attributes.bgcolor ? attributes.bgcolor : '#ecf8d5',
                backgroundImage: attributes.bggradient ? attributes.bggradient : null,
                borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
                borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
                borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
                borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
                boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
              }
            },
            el('button',
              {
                className: 'obb-alert-close'
              },
              el('i', { className: 'obb-alert-icon fas fa-times', style: { color: attributes.iconcolor ? attributes.iconcolor : null } })
            ),
            el('div', { className: 'obb-alert-content' },
              el(InnerBlocks.Content)
            )
          ),
          alertOverlay
        )
      )
    }
  })
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
)
