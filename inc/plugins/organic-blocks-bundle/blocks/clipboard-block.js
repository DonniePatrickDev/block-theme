(function (blocks, editor, components, i18n, element, compose, _) {
  // var _ = wp.underscore
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var useInstanceId = wp.compose.useInstanceId
  var useSetting = wp.blockEditor.useSetting
  var RichText = wp.blockEditor.RichText
  var BlockControls = wp.blockEditor.BlockControls
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var TextControl = components.TextControl
  var TextareaControl = components.TextareaControl
  var ToggleControl = components.ToggleControl
  var RangeControl = components.RangeControl
  var ColorPicker = components.ColorPicker
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
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

  // Create custom clipboard icon SVG.
  const clipboardIcon = el('svg',
    {
      class: 'organic-clipboard-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M19 3h-1v2h1v17h-14v-17h1v-2h-1c-1.103 0-2 0.897-2 2v17c0 1.103 0.897 2 2 2h14c1.103 0 2-0.897 2-2v-17c0-1.103-0.897-2-2-2z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M7.5 5h9c0.275 0 0.5-0.225 0.5-0.5v-1c0-0.828-0.672-1.5-1.5-1.5h-0.559c-0.119-0.494-0.416-0.947-0.859-1.303-0.563-0.45-1.3-0.697-2.081-0.697s-1.519 0.247-2.081 0.697c-0.447 0.356-0.741 0.809-0.859 1.303h-0.559c-0.828 0-1.5 0.672-1.5 1.5v1c0 0.275 0.225 0.5 0.5 0.5zM8 3.5c0-0.275 0.225-0.5 0.5-0.5h1c0.275 0 0.5-0.225 0.5-0.5 0-0.378 0.194-0.744 0.544-1.022 0.384-0.309 0.903-0.478 1.456-0.478s1.072 0.169 1.456 0.478c0.35 0.281 0.544 0.644 0.544 1.022 0 0.275 0.225 0.5 0.5 0.5h1c0.275 0 0.5 0.225 0.5 0.5v0.5h-8v-0.5z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M17 8h-10v-1h10v1zM13 10h-6v1h6v-1zM17 12h-10v1h10v-1zM15 14h-8v1h8v-1zM17 16h-10v1h10v-1zM16 18h-9v1h9v-1z'
        }
      )
    )
  )

  const organicClipboardBlock = registerBlockType('obb/clipboard-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Copy To Clipboard', 'obb'), // The title of our block.
    description: __('A button that copies custom content to the clipboard.', 'obb'), // The description of our block.
    icon: clipboardIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
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
        selector: '.obb-clipboard-button-text'
      },
      clipboardcontent: {
        type: 'string'
      },
      alertcopy: {
        type: 'string',
        default: __('Copied to clipboard!', 'obb')
      },
      displaylink: {
        type: 'boolean',
        default: false
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
      buttontextcolor: {
        type: 'string'
      },
      buttonbg: {
        type: 'string'
      },
      buttonbggradient: {
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
      var clipboardcontent = props.attributes.clipboardcontent
      var alertcopy = props.attributes.alertcopy
      var displaylink = props.attributes.displaylink
      var btnradius = props.attributes.btnradius
      var btnshadow = props.attributes.btnshadow
      var btnborderwidth = props.attributes.btnborderwidth
      var btnbordercolor = props.attributes.btnbordercolor
      var btnshadowcolor = props.attributes.btnshadowcolor
      var buttontextcolor = props.attributes.buttontextcolor
      var buttonbg = props.attributes.buttonbg
      var buttonbggradient = props.attributes.buttonbggradient

      var instanceId = useInstanceId(organicClipboardBlock)
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
            el(TextareaControl, {
              label: __('Clipboard Content', 'obb'),
              help: __('The content that will be copied on click.', 'obb'),
              rows: 8,
              value: clipboardcontent,
              onChange: function (val) {
                props.setAttributes({ clipboardcontent: val })
              }
            }),
            el(TextControl, {
              label: __('Copy Notification', 'obb'),
              help: __('The popup alert notification when content is copied.', 'obb'),
              value: alertcopy,
              onChange: function (val) {
                props.setAttributes({ alertcopy: val })
              }
            }),
            el(ToggleControl, {
              label: __('Display Button As Text Link', 'obb'),
              checked: displaylink,
              onChange: function (val) { props.setAttributes({ displaylink: val }) }
            })
          ),
          el(PanelColorSettings, {
            title: __('Button Colors', 'obb'),
            initialOpen: true,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                label: __('Background Color', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: buttonbg,
                gradientValue: buttonbggradient,
                onChange: function (val) { props.setAttributes({ buttonbg: val }) },
                onGradientChange: function (val) { props.setAttributes({ buttonbggradient: val }) }
              },
              {
                colors: colorOptions,
                label: __('Text Color', 'obb'),
                value: buttontextcolor,
                onChange: function (val) { props.setAttributes({ buttontextcolor: val }) }
              },
              {
                label: __('Border Color', 'obb'),
                colors: colorOptions,
                value: btnbordercolor,
                onChange: function (val) { props.setAttributes({ btnbordercolor: val }) }
              },
              {
                label: __('Shadow Color', 'obb'),
                colors: colorOptions,
                value: btnshadowcolor,
                onChange: function (val) { props.setAttributes({ btnshadowcolor: val }) }
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
            value: btnradius,
            onChange: function (val) { props.setAttributes({ btnradius: val }) }
          }),
          el(RangeControl, {
            label: __('Border Width', 'obb'),
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
            label: __('Shadow Size', 'obb'),
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
            className: 'organic-block obb-clipboard wp-block-button obb-clipboard-button ' + props.className,
            style: {
              textAlign: attributes.alignment
            }
          },
          el('a',
            {
              id: 'obb-clipboard-button-' + attributes.id,
              className: attributes.displaylink !== true ? 'wp-block-button__link' : null,
              href: null,
              style: {
                color: attributes.buttontextcolor,
                // background: attributes.displaylink !== true && attributes.buttonbg ? attributes.buttonbg : attributes.buttonbggradient,
                backgroundColor: attributes.displaylink !== true && attributes.buttonbg ? attributes.buttonbg : null,
                backgroundImage: attributes.displaylink !== true && attributes.buttonbggradient ? attributes.buttonbggradient : null,
                borderRadius: attributes.btnradius !== 0 && attributes.displaylink !== true ? attributes.btnradius : null,
                borderWidth: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? attributes.btnborderwidth : null,
                borderStyle: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? 'solid' : null,
                borderColor: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? attributes.btnbordercolor : null,
                boxShadow: attributes.btnshadow !== 0 ? '0 0 ' + attributes.btnshadow + 'px ' + attributes.btnshadowcolor : null
              }
            },
            attributes.buttontext && el(RichText, {
              key: 'editable',
              className: 'obb-clipboard-button-text',
              tagName: 'span',
              allowedFormats: ['core/bold', 'core/italic'],
              placeholder: __('Clipboard Button', 'obb'),
              keepPlaceholderOnFocus: true,
              value: buttontext,
              onChange: function (newText) {
                props.setAttributes({ buttontext: newText })
              }
            })
          )
        )
      ]
    },

    example: function () {},

    save: function (props) {
      var attributes = props.attributes
      var alertcopy = attributes.alertcopy
      var clipboardcontent = _.escape(attributes.clipboardcontent)

      return (
        el('div',
          {
            id: 'obb-clipboard-id-' + attributes.id,
            className: 'organic-block obb-clipboard wp-block-button obb-clipboard-button',
            style: {
              textAlign: attributes.alignment
            }
          },
          el('a',
            {
              id: 'obb-clipboard-button-' + attributes.id,
              className: attributes.displaylink !== true ? 'wp-block-button__link' : null,
              'data-alert-target': 'obb-clipboard-alert-' + attributes.id,
              'data-clipboard-text': clipboardcontent,
              href: null,
              style: {
                color: attributes.buttontextcolor,
                // background: attributes.displaylink !== true && attributes.buttonbg ? attributes.buttonbg : attributes.buttonbggradient,
                backgroundColor: attributes.displaylink !== true && attributes.buttonbg ? attributes.buttonbg : null,
                backgroundImage: attributes.displaylink !== true && attributes.buttonbggradient ? attributes.buttonbggradient : null,
                borderRadius: attributes.btnradius !== 0 && attributes.displaylink !== true ? attributes.btnradius : null,
                borderWidth: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? attributes.btnborderwidth : null,
                borderStyle: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? 'solid' : null,
                borderColor: attributes.btnborderwidth !== 0 && attributes.displaylink !== true ? attributes.btnbordercolor : null,
                boxShadow: attributes.btnshadow !== 0 ? '0 0 ' + attributes.btnshadow + 'px ' + attributes.btnshadowcolor : null
              }
            },
            attributes.buttontext && el(RichText.Content, {
              className: 'obb-clipboard-button-text',
              tagName: 'span',
              value: attributes.buttontext
            })
          ),
          el('div',
            {
              id: 'obb-clipboard-alert-' + attributes.id,
              className: 'obb-clipboard-alert'
            },
            alertcopy
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
  window.wp.compose,
  window._
)
