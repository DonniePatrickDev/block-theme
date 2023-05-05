(function (blocks, editor, components, i18n, element) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var createBlock = blocks.createBlock
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var BlockControls = wp.blockEditor.BlockControls
  var BlockVerticalAlignmentToolbar = wp.blockEditor.BlockVerticalAlignmentToolbar
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var SelectControl = components.SelectControl
  var RangeControl = components.RangeControl
  var ColorPicker = components.ColorPicker
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
  var BaseControl = components.BaseControl
  var UnitControl = components.__experimentalUnitControl
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
  var orientationOptions = [
    { label: __('Horizontal', 'obb'), value: 'horizontal' },
    { label: __('Vertical', 'obb'), value: 'vertical' }
  ]
  var unitTypes = [
    { value: 'px', label: 'px', default: 0 },
    { value: '%', label: '%', default: 0 },
    { value: 'em', label: 'em', default: 0 }
  ]
  var iconTemplate = [
    ['core/image', { className: 'obb-icon-img', align: 'center', url: js_icon_data.default_icon_url, width: 64, height: 64 }],
    ['core/group', { className: 'obb-icon-content' }, [
      ['core/heading', { level: 4, placeholder: 'Icon Box', textAlign: 'center', textColor: 'black' }],
      ['core/paragraph', { placeholder: 'The Icon Box Block displays featured content with an icon and a link.', align: 'center' }],
      ['core/buttons', { itemsJustification: 'center' }, [
        ['core/button', { placeholder: 'Example Button', itemsJustification: 'center', align: 'center' }]
      ]]
    ]]
  ]

  // Create custom Content Slideshow icon SVG.
  const iconBoxIcon = el('svg',
    {
      class: 'organic-icon-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M22,0H2C0.9,0,0,0.9,0,2v20c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V2C24,0.9,23.1,0,22,0z M22,22H2L2,2c0,0,0,0,0,0h20V22z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M8,14h8v1H8V14z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M5,17h14v1H5V17z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M5,19h14v1H5V19z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M14,4.5c-0.8,0-1.5,0.4-2,1c-0.5-0.6-1.2-1-2-1C8.6,4.5,7.5,5.7,7.5,7c0,1.2,0.7,2.5,2.2,3.8c1,1,2,1.6,2.1,1.6c0.1,0.1,0.2,0.1,0.3,0.1s0.2,0,0.3-0.1c0,0,1.1-0.7,2.1-1.6c1.4-1.3,2.2-2.6,2.2-3.8C16.5,5.7,15.4,4.5,14,4.5z M12,11.4C10.8,10.6,8.5,8.7,8.5,7c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5v0.5h1V7c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5C15.5,8.7,13.2,10.6,12,11.4z'
        }
      )
    )
  )

  const organicIconBlock = registerBlockType('obb/icon-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Icon Box', 'obb'), // The title of our block.
    description: __('A block for displaying featured content boxes with an icon.', 'obb'), // The description of our block.
    icon: iconBoxIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
      align: true,
      alignWide: true,
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: false // Enable padding UI control.
      }
    },
    attributes: { // Necessary for saving block content.
      orientation: {
        type: 'string',
        default: 'vertical'
      },
      verticalAlign: {
        type: 'string',
        default: 'center'
      },
      vertpadding: {
        type: 'string',
        default: '48px'
      },
      horizpadding: {
        type: 'string',
        default: '48px'
      },
      styleradius: {
        type: 'number',
        default: 12
      },
      styleshadow: {
        type: 'number',
        default: 24
      },
      styleborderwidth: {
        type: 'number',
        default: 0
      },
      stylebordercolor: {
        type: 'string',
        default: '#ccc'
      },
      styleshadowcolor: {
        type: 'string'
      },
      bgcolor: {
        type: 'string',
        default: '#fff'
      },
      bggradient: {
        type: 'string'
      }
    },

    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var orientation = props.attributes.orientation
      var verticalAlign = props.attributes.verticalAlign
      var vertpadding = props.attributes.vertpadding
      var horizpadding = props.attributes.horizpadding
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var bgcolor = props.attributes.bgcolor
      var bggradient = props.attributes.bggradient

      function onChangeVerticalAlignment (newAlignment) {
        props.setAttributes({ verticalAlign: newAlignment })
      }

      return [
        el(BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
          attributes.orientation === 'horizontal' && el(BlockVerticalAlignmentToolbar, {
            value: verticalAlign,
            onChange: onChangeVerticalAlignment
          })
        ),
        el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
          el(PanelBody,
            {
              title: __('Settings', 'obb')
            },
            el(SelectControl, {
              label: __('Content Orientation', 'obb'),
              value: orientation,
              options: orientationOptions,
              onChange: function (val) { props.setAttributes({ orientation: val }) }
            }),
            el(BaseControl,
              {
                help: __('Set the top and bottom padding for the container.', 'obb')
              },
              el(UnitControl, {
                label: __('Vertical Padding', 'obb'),
                type: 'number',
                min: 0,
                units: unitTypes,
                value: vertpadding,
                onChange: function (val) { props.setAttributes({ vertpadding: val }) }
              })
            ),
            el(BaseControl,
              {
                help: __('Set the left and right padding for the container.', 'obb')
              },
              el(UnitControl, {
                label: __('Horizontal Padding', 'obb'),
                type: 'number',
                min: 0,
                units: unitTypes,
                value: horizpadding,
                onChange: function (val) { props.setAttributes({ horizpadding: val }) }
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
            className: 'organic-block obb-icon-box' + ' obb-orientation-' + attributes.orientation + ' obb-vertical-align-' + attributes.verticalAlign + ' ' + props.className,
            style: {
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : '#fff',
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              paddingTop: attributes.vertpadding,
              paddingBottom: attributes.vertpadding,
              paddingLeft: attributes.horizpadding,
              paddingRight: attributes.horizpadding,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el(InnerBlocks, { template: iconTemplate })
        )
      ]
    },

    example: function () {},

    save: function (props) {
      var attributes = props.attributes

      return (
        el('div',
          {
            className: 'organic-block obb-icon-box' + ' obb-orientation-' + attributes.orientation + ' obb-vertical-align-' + attributes.verticalAlign,
            style: {
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : '#fff',
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              paddingTop: attributes.vertpadding,
              paddingBottom: attributes.vertpadding,
              paddingLeft: attributes.horizpadding,
              paddingRight: attributes.horizpadding,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el(InnerBlocks.Content)
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
