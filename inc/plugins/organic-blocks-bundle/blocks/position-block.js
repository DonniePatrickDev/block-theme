(function (blocks, editor, components, i18n, element) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var createBlock = blocks.createBlock
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var RangeControl = components.RangeControl
  var ColorPicker = components.ColorPicker
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
  var BaseControl = components.BaseControl
  var ToggleControl = components.ToggleControl
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
  var positionTemplate = [
    ['core/spacer', { height: '40px' }],
    ['core/heading', { level: 4, placeholder: 'Move Or Scale This Content', textAlign: 'center' }],
    ['core/paragraph', { placeholder: 'The Position Container Block wraps content in a container that can be scaled or moved. Modify or replace the content in this block, and change the position and scale in the block settings.', align: 'center' }],
    ['core/spacer', { height: '40px' }]
  ]

  // Create custom Content Slideshow icon SVG.
  const positionIcon = el('svg',
    {
      class: 'organic-position-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M22,0H2C0.9,0,0,0.9,0,2v20c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V2C24,0.9,23.1,0,22,0z M22,22H2V2h20V22C22,22,22,22,22,22z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M20.5,3h-17C3.2,3,3,3.2,3,3.5v17C3,20.8,3.2,21,3.5,21h17c0.3,0,0.5-0.2,0.5-0.5v-17C21,3.2,20.8,3,20.5,3zM20,20H4V4h16V20z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M18.4,11.6L16,9.3L15.3,10l1.5,1.5h-4.3v-1h0V7.2L14,8.7L14.7,8l-2.4-2.4c-0.1-0.1-0.2-0.1-0.4-0.1s-0.3,0-0.4,0.1L9.3,8L10,8.7l1.5-1.5v4.3h-1v0H7.2L8.7,10L8,9.3l-2.4,2.4c-0.2,0.2-0.2,0.5,0,0.7L8,14.7L8.7,14l-1.5-1.5h4.3v1h0v3.3L10,15.3L9.3,16l2.4,2.4c0.2,0.2,0.5,0.2,0.7,0l2.4-2.4L14,15.3l-1.5,1.5v-4.3h1v0h3.3L15.3,14l0.7,0.7l2.4-2.4c0.1-0.1,0.1-0.2,0.1-0.4S18.5,11.7,18.4,11.6z'
        }
      )
    )
  )

  const organicPositionBlock = registerBlockType('obb/position-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Position Container', 'obb'), // The title of our block.
    description: __('Move the position of all content inside this block.', 'obb'), // The description of our block.
    icon: positionIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
      align: ['wide', 'full'],
      alignWide: true,
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: false // Enable padding UI control.
      }
    },
    transforms: {
      from: [
        {
          type: 'block',
          blocks: ['core/group', 'core/columns'],
          transform: function (attributes, innerBlocks) {
            return createBlock(
              'obb/position-block',
              attributes,
              innerBlocks
            )
          }
        }
      ],
      to: [
        {
          type: 'block',
          blocks: ['*'],
          transform: function (attributes, innerBlocks) {
            return createBlock(
              'core/group',
              attributes,
              innerBlocks
            )
          }
        }
      ]
    },
    attributes: { // Necessary for saving block content.
      align: {
        type: 'string',
        default: 'wide'
      },
      moveup: {
        type: 'number',
        default: 0
      },
      movedown: {
        type: 'number',
        default: 0
      },
      movehorizontal: {
        type: 'number',
        default: 0
      },
      pullleft: {
        type: 'number',
        default: 0
      },
      pullright: {
        type: 'number',
        default: 0
      },
      stylescale: {
        type: 'number',
        default: 1
      },
      resetmobile: {
        type: 'boolean',
        default: false
      },
      styleradius: {
        type: 'number',
        default: 0
      },
      styleshadow: {
        type: 'number',
        default: 0
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
        type: 'string'
      },
      bggradient: {
        type: 'string'
      }
    },

    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var moveup = props.attributes.moveup
      var movedown = props.attributes.movedown
      var movehorizontal = props.attributes.movehorizontal
      var pullleft = props.attributes.pullleft
      var pullright = props.attributes.pullright
      var stylescale = props.attributes.stylescale
      var resetmobile = props.attributes.resetmobile
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var bgcolor = props.attributes.bgcolor
      var bggradient = props.attributes.bggradient
      var resetMobileClass = props.attributes.resetmobile === true ? ' obb-mobile-reset' : ''

      return [
        el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
          el(PanelBody,
            {
              title: __('Settings', 'obb')
            },
            el(RangeControl, {
              label: __('Move Up', 'obb'),
              help: __('Move the content up.', 'obb'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 0,
              min: 0,
              max: 600,
              step: 2,
              value: moveup,
              onChange: function (val) { props.setAttributes({ moveup: val }) }
            }),
            el(RangeControl, {
              label: __('Move Down', 'obb'),
              help: __('Move the content down.', 'obb'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 0,
              min: 0,
              max: 600,
              step: 2,
              value: movedown,
              onChange: function (val) { props.setAttributes({ movedown: val }) }
            }),
            el(RangeControl, {
              label: __('Move Horizontal', 'obb'),
              help: __('Move the content left or right.', 'obb'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 0,
              min: -600,
              max: 600,
              step: 2,
              value: movehorizontal,
              onChange: function (val) { props.setAttributes({ movehorizontal: val }) }
            }),
            el(RangeControl, {
              label: __('Pull Left', 'obb'),
              help: __('Stretches the content to the left.', 'obb'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 0,
              min: 0,
              max: 800,
              step: 2,
              value: pullleft,
              onChange: function (val) { props.setAttributes({ pullleft: val }) }
            }),
            el(RangeControl, {
              label: __('Pull Right', 'obb'),
              help: __('Stretches the content to the right.', 'obb'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 0,
              min: 0,
              max: 800,
              step: 2,
              value: pullright,
              onChange: function (val) { props.setAttributes({ pullright: val }) }
            }),
            el(RangeControl, {
              label: __('Scale', 'obb'),
              help: __('Scale content larger or smaller.', 'obb'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 1,
              min: 0.1,
              max: 2,
              step: 0.01,
              value: stylescale,
              onChange: function (val) { props.setAttributes({ stylescale: val }) }
            }),
            el(ToggleControl, {
              label: __('Reset Position In Mobile', 'obb'),
              checked: resetmobile,
              onChange: function (val) { props.setAttributes({ resetmobile: val }) }
            })
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
            className: 'organic-block obb-position ' + props.className + resetMobileClass,
            style: {
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : null,
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              transform: 'scale(' + attributes.stylescale + ')',
              marginLeft: attributes.pullleft !== 0 ? '-' + attributes.pullleft + 'px' : 0,
              marginRight: attributes.pullright !== 0 ? '-' + attributes.pullright + 'px' : 0,
              marginTop: attributes.moveup !== 0 ? '-' + attributes.moveup + 'px' : 0,
              left: attributes.movehorizontal !== 0 ? attributes.movehorizontal + 'px' : 'auto',
              bottom: attributes.movedown !== 0 ? '-' + attributes.movedown + 'px' : 'auto',
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              // clipPath: attributes.styleradius !== 0 ? 'inset(0 0 0 0 round ' + attributes.styleradius + 'px)' : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null,
              overflow: attributes.styleradius !== 0 ? 'hidden' : null,
              zIndex: attributes.stylescale > 1 ? 8 : 7
            }
          },
          el(InnerBlocks, { renderAppender: InnerBlocks.ButtonBlockAppender })
        )
      ]
    },

    example: function () {},

    save: function (props) {
      var attributes = props.attributes
      var resetMobileClass = attributes.resetmobile === true ? ' obb-mobile-reset' : ''

      return (
        el('div',
          {
            className: 'organic-block obb-position ' + resetMobileClass,
            style: {
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : null,
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              transform: 'scale(' + attributes.stylescale + ')',
              marginLeft: attributes.pullleft !== 0 ? '-' + attributes.pullleft + 'px' : 0,
              marginRight: attributes.pullright !== 0 ? '-' + attributes.pullright + 'px' : 0,
              marginTop: attributes.moveup !== 0 ? '-' + attributes.moveup + 'px' : 0,
              left: attributes.movehorizontal !== 0 ? attributes.movehorizontal + 'px' : 'auto',
              bottom: attributes.movedown !== 0 ? '-' + attributes.movedown + 'px' : 'auto',
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              // clipPath: attributes.styleradius !== 0 ? 'inset(0 0 0 0 round ' + attributes.styleradius + 'px)' : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null,
              overflow: attributes.styleradius !== 0 ? 'hidden' : null,
              zIndex: attributes.stylescale > 1 ? 8 : 7
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
