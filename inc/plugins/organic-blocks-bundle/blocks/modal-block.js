(function (blocks, editor, components, i18n, element, compose) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var useInstanceId = wp.compose.useInstanceId
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var RichText = wp.blockEditor.RichText
  var BlockControls = wp.blockEditor.BlockControls
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var SelectControl = components.SelectControl
  var ToggleControl = components.ToggleControl
  var RangeControl = components.RangeControl
  var ColorPicker = components.ColorPicker
  var ColorIndicator = components.ColorIndicator
  var ColorPalette = components.ColorPalette
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
  var styleOptions = [
    { label: __('Minimal', 'obb'), value: 'minimal' },
    { label: __('Modern', 'obb'), value: 'modern' },
    { label: __('Bordered', 'obb'), value: 'bordered' },
    { label: __('Rounded', 'obb'), value: 'rounded' }
  ]
  var unitTypes = [
    { value: 'px', label: 'px', default: 0 },
    { value: '%', label: '%', default: 10 },
    { value: 'em', label: 'em', default: 0 }
  ]
  var modalTemplate = [
    ['core/cover', { url: js_img_data.default_image_url, minHeight: 280, dimRatio: 40 }, [
      ['core/heading', { level: 6, placeholder: 'Modal Example', fontSize: 'large', textColor: 'white', textAlign: 'center' }],
      ['core/paragraph', { placeholder: 'This is an example subheading.', fontSize: 'medium', textColor: 'white', align: 'center' }]
    ]],
    ['core/paragraph', { placeholder: 'Enter your modal content.', align: 'center' }]
  ]

  // Create custom modal icon SVG.
  const modalIcon = el('svg',
    {
      class: 'organic-modal-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M18 5h-6v2h3.584l-5.541 5.544 1.416 1.416 5.541-5.544v3.584h2v-6c0-0.553-0.447-1-1-1z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M22 0h-15c-1.103 0-2 0.897-2 2v3h-4.5c-0.275 0-0.5 0.225-0.5 0.5v18c0 0.275 0.225 0.5 0.5 0.5h18c0.275 0 0.5-0.225 0.5-0.5v-4.5h3c1.103 0 2-0.897 2-2v-15c0-1.103-0.897-2-2-2zM18 23h-17v-17h4v11c0 1.103 0.897 2 2 2h11v4zM22 17h-15v-15h15v15c0.003 0 0 0 0 0z'
        }
      )
    )
  )

  const organicModalBlock = registerBlockType('obb/modal-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Modal', 'obb'), // The title of our block.
    description: __('Create content within a dismissible modal box.', 'obb'), // The description of our block.
    icon: modalIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
      // align: ['wide', 'full'],
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: true // Enable padding UI control.
      }
    },
    styles: [
      {
        name: 'fill',
        label: __('Fill', 'obb'),
        isDefault: true
      },
      {
        name: 'outline',
        label: __('Outline', 'obb')
      }
    ],
    attributes: { // Necessary for saving block content.
      id: {
        type: 'number',
        default: 0
      },
      buttontext: {
        type: 'array',
        source: 'children',
        selector: '.obb-modal-button-text'
      },
      modalstyle: {
        type: 'string',
        default: 'minimal'
      },
      modalwidth: {
        type: 'string',
        default: '720px'
      },
      styleradius: {
        type: 'number',
        default: 0
      },
      styleshadow: {
        type: 'number',
        default: 12
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
      btnradius: {
        type: 'number',
        default: 3
      },
      btnshadow: {
        type: 'number',
        default: 12
      },
      btnborderwidth: {
        type: 'number',
        default: 1
      },
      btnbordercolor: {
        type: 'string',
        default: '#ccc'
      },
      btnshadowcolor: {
        type: 'string'
      },
      displaylink: {
        type: 'boolean',
        default: false
      },
      buttontextcolor: {
        type: 'string'
      },
      buttonbg: {
        type: 'string'
      },
      buttonbggradient: {
        type: 'string'
      },
      // buttonbghover: {
      //   type: 'string'
      // },
      bgcolor: {
        type: 'string',
        default: '#fff'
      },
      bggradient: {
        type: 'string'
      },
      alignment: {
        type: 'string',
        default: 'center'
      }
    },

    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var alignment = props.attributes.alignment
      var buttontext = props.attributes.buttontext
      var modalstyle = props.attributes.modalstyle
      var modalwidth = props.attributes.modalwidth
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var btnradius = props.attributes.btnradius
      var btnshadow = props.attributes.btnshadow
      var btnborderwidth = props.attributes.btnborderwidth
      var btnbordercolor = props.attributes.btnbordercolor
      var btnshadowcolor = props.attributes.btnshadowcolor
      var displaylink = props.attributes.displaylink
      var buttontextcolor = props.attributes.buttontextcolor
      var buttonbg = props.attributes.buttonbg
      var buttonbggradient = props.attributes.buttonbggradient
      // var buttonbghover = props.attributes.buttonbghover
      var bgcolor = props.attributes.bgcolor
      var bggradient = props.attributes.bggradient

      var instanceId = useInstanceId(organicModalBlock)
      props.setAttributes({ id: instanceId })

      function onChangeAlignment (newAlignment) {
        props.setAttributes({ alignment: newAlignment })
      }

      return [
        el(BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
          // Display alignment toolbar within block controls.
          el(AlignmentToolbar, {
            value: alignment,
            onChange: onChangeAlignment
          })
        ),
        el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
          el(PanelBody,
            {
              title: __('Settings', 'obb')
            },
            el(SelectControl, {
              label: __('Modal Style Presets', 'obb'),
              value: modalstyle,
              options: styleOptions,
              onChange: function (val) { props.setAttributes({ modalstyle: val }) }
            }),
            el(BaseControl,
              {
                help: __('Set a custom width for modal popup.', 'obb')
              },
              el(UnitControl, {
                label: __('Modal Width', 'obb'),
                type: 'number',
                units: unitTypes,
                value: modalwidth,
                onChange: function (val) { props.setAttributes({ modalwidth: val }) }
              })
            ),
            el(ToggleControl, {
              label: __('Display Button As Text Link', 'obb'),
              checked: displaylink,
              onChange: function (val) { props.setAttributes({ displaylink: val }) }
            })
          ),
          el(PanelColorSettings, {
            title: __('Colors', 'obb'),
            initialOpen: true,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                label: __('Modal Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: bgcolor,
                gradientValue: bggradient,
                onChange: function (val) { props.setAttributes({ bgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ bggradient: val }) }
              },
              {
                label: __('Modal Border', 'obb'),
                colors: colorOptions,
                value: stylebordercolor,
                onChange: function (val) { props.setAttributes({ stylebordercolor: val }) }
              },
              {
                label: __('Modal Shadow', 'obb'),
                colors: colorOptions,
                value: styleshadowcolor,
                onChange: function (val) { props.setAttributes({ styleshadowcolor: val }) }
              },
              {
                label: __('Button Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: buttonbg,
                gradientValue: buttonbggradient,
                onChange: function (val) { props.setAttributes({ buttonbg: val }) },
                onGradientChange: function (val) { props.setAttributes({ buttonbggradient: val }) }
              },
              {
                colors: colorOptions,
                label: __('Button Text', 'obb'),
                value: buttontextcolor,
                onChange: function (val) { props.setAttributes({ buttontextcolor: val }) }
              },
              {
                label: __('Button Border', 'obb'),
                colors: colorOptions,
                value: btnbordercolor,
                onChange: function (val) { props.setAttributes({ btnbordercolor: val }) }
              },
              {
                label: __('Button Shadow', 'obb'),
                colors: colorOptions,
                value: btnshadowcolor,
                onChange: function (val) { props.setAttributes({ btnshadowcolor: val }) }
              }
            ]
          },
          el(RangeControl, {
            label: __('Modal Border Radius', 'obb'),
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
            label: __('Modal Border Width', 'obb'),
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
            label: __('Modal Shadow Size', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 100,
            step: 1,
            value: styleshadow,
            onChange: function (val) { props.setAttributes({ styleshadow: val }) }
          }),
          el(RangeControl, {
            label: __('Button Border Radius', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 100,
            step: 1,
            value: btnradius,
            onChange: function (val) { props.setAttributes({ btnradius: val }) }
          }),
          el(RangeControl, {
            label: __('Button Border Width', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 20,
            step: 1,
            value: btnborderwidth,
            onChange: function (val) { props.setAttributes({ btnborderwidth: val }) }
          }),
          el(RangeControl, {
            label: __('Button Shadow Size', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 100,
            step: 1,
            value: btnshadow,
            onChange: function (val) { props.setAttributes({ btnshadow: val }) }
          })
          )
        ),
        el('div',
          {
            className: 'organic-block obb-modal'
          },
          el('div',
            {
              id: 'obb-modal-box-' + attributes.id,
              className: 'modal obb-modal-box' + ' obb-style-' + attributes.modalstyle + ' obb-align-' + attributes.alignment,
              style: {
                maxWidth: attributes.modalwidth !== '' ? attributes.modalwidth : null
              }
            },
            el('div',
              {
                className: 'obb-modal-content',
                style: {
                  // background: attributes.bgcolor ? attributes.bgcolor : attributes.bggradient,
                  backgroundColor: attributes.bgcolor !== '' ? attributes.bgcolor : null,
                  backgroundImage: attributes.bggradient !== '' ? attributes.bggradient : null,
                  borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
                  borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
                  borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
                  borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
                  boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
                }
              },
              el(InnerBlocks, { template: modalTemplate }
              )
            )
          ),
          el('div',
            {
              className: attributes.displaylink !== true ? 'wp-block-button obb-modal-button ' + props.className : 'obb-modal-button',
              style: {
                textAlign: attributes.alignment
              }
            },
            el('a',
              {
                className: attributes.displaylink !== true ? 'wp-block-button__link obb-modal-open' : 'obb-modal-open',
                href: null,
                rel: null,
                // onMouseOut: null,
                // onMouseOver: null,
                style: {
                  color: attributes.buttontextcolor,
                  // background: attributes.displaylink !== true && attributes.buttonbg ? attributes.buttonbg : attributes.buttonbggradient,
                  backgroundColor: attributes.displaylink !== true && attributes.buttonbg !== '' ? attributes.buttonbg : null,
                  backgroundImage: attributes.displaylink !== true && attributes.buttonbggradient !== '' ? attributes.buttonbggradient : null,
                  borderRadius: attributes.btnradius !== 0 && attributes.displaylink !== true ? attributes.btnradius : null,
                  borderWidth: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? attributes.btnborderwidth : null,
                  borderStyle: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? 'solid' : null,
                  borderColor: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? attributes.btnbordercolor : null,
                  boxShadow: attributes.btnshadow !== 0 ? '0 0 ' + attributes.btnshadow + 'px ' + attributes.btnshadowcolor : null
                }
              },
              attributes.buttontext && el(RichText, {
                key: 'editable',
                className: 'obb-modal-button-text',
                tagName: 'span',
                allowedFormats: ['core/bold', 'core/italic'],
                placeholder: __('Modal Button', 'obb'),
                keepPlaceholderOnFocus: true,
                value: buttontext,
                onChange: function (newText) {
                  props.setAttributes({ buttontext: newText })
                }
              })
            )
          )
        )
      ]
    },

    example: function () {},

    save: function (props) {
      var attributes = props.attributes

      return (
        el('div',
          {
            className: 'organic-block obb-modal'
          },
          el('div',
            {
              id: 'obb-modal-box-' + attributes.id,
              className: 'modal obb-modal-box' + ' obb-style-' + attributes.modalstyle + ' obb-align-' + attributes.alignment,
              style: {
                maxWidth: attributes.modalwidth !== '' ? attributes.modalwidth : null
              }
            },
            el('div',
              {
                className: 'obb-modal-content',
                style: {
                  // background: attributes.bgcolor ? attributes.bgcolor : attributes.bggradient,
                  backgroundColor: attributes.bgcolor !== '' ? attributes.bgcolor : null,
                  backgroundImage: attributes.bggradient !== '' ? attributes.bggradient : null,
                  borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
                  borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
                  borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
                  borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
                  boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
                }
              },
              el(InnerBlocks.Content)
            )
          ),
          el('div',
            {
              className: attributes.displaylink !== true ? 'wp-block-button obb-modal-button' : 'obb-modal-button',
              style: {
                textAlign: attributes.alignment
              }
            },
            el('a',
              {
                className: attributes.displaylink !== true ? 'wp-block-button__link obb-modal-open' : 'obb-modal-open',
                href: '#obb-modal-box-' + attributes.id,
                rel: 'modal:open',
                // onMouseOut: attributes.displaylink !== true ? 'this.style.background="' + attributes.buttonbg + '"' : null,
                // onMouseOver: attributes.displaylink !== true ? 'this.style.background="' + attributes.buttonbghover + '"' : null,
                style: {
                  color: attributes.buttontextcolor,
                  // background: attributes.displaylink !== true && attributes.buttonbg ? attributes.buttonbg : attributes.buttonbggradient,
                  backgroundColor: attributes.displaylink !== true && attributes.buttonbg !== '' ? attributes.buttonbg : null,
                  backgroundImage: attributes.displaylink !== true && attributes.buttonbggradient !== '' ? attributes.buttonbggradient : null,
                  borderRadius: attributes.btnradius !== 0 && attributes.displaylink !== true ? attributes.btnradius : null,
                  borderWidth: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? attributes.btnborderwidth : null,
                  borderStyle: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? 'solid' : null,
                  borderColor: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? attributes.btnbordercolor : null,
                  boxShadow: attributes.btnshadow !== 0 ? '0 0 ' + attributes.btnshadow + 'px ' + attributes.btnshadowcolor : null
                }
              },
              attributes.buttontext && el(RichText.Content, {
                className: 'obb-modal-button-text',
                tagName: 'span',
                value: attributes.buttontext
              })
            )
          )
        )
      )
    }
  })
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element,
  window.wp.compose
)
