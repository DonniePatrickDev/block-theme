(function (data, blocks, editor, components, element, i18n, serverSideRender, apiFetch) {
  // Load Components
  var __ = i18n.__
  var el = element.createElement
  var withSelect = data.withSelect
  var useSetting = wp.blockEditor.useSetting
  var MediaUpload = editor.MediaUpload
  var ServerSideRender = serverSideRender
  var BlockControls = wp.blockEditor.BlockControls
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var ColorPicker = components.ColorPicker
  var ColorIndicator = components.ColorIndicator
  var PanelBody = components.PanelBody
  var ToggleControl = components.ToggleControl
  var SelectControl = components.SelectControl
  var TextControl = components.TextControl
  var RangeControl = components.RangeControl
  var BaseControl = components.BaseControl
  var Button = components.Button

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
  var obbGray = [
    { name: __('White', 'obb'), color: '#fff' },
    { name: __('Black', 'obb'), color: '#000' },
    { name: __('Silver', 'obb'), color: '#eee' },
    { name: __('Light Gray', 'obb'), color: '#999' },
    { name: __('Medium Gray', 'obb'), color: '#666' },
    { name: __('Dark Gray', 'obb'), color: '#333' }
  ]
  var gradientOptions = [
    {
      name: 'Midnight Hour',
      gradient: 'linear-gradient(180deg, rgb(0, 5, 80), rgb(124, 0, 163) 100%)',
      slug: 'midnight-hour'
    },
    {
      name: 'California Dusk',
      gradient: 'linear-gradient(135deg, rgb(223, 212, 0), rgb(156, 0, 163) 100%)',
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
  var weightOptions = [
    { label: __('Light', 'obb'), value: 'light' },
    { label: __('Normal', 'obb'), value: 'normal' },
    { label: __('Bold', 'obb'), value: 'bold' }
  ]
  var headingOptions = [
    { label: __('Relative', 'obb'), value: 'position-relative' },
    { label: __('Fixed', 'obb'), value: 'position-fixed' },
    { label: __('Absolute', 'obb'), value: 'position-absolute' }
  ]

  // Get Site Menus
  var wpmenus = []
  var wpmenuCall = apiFetch({ path: '/obbroute/menu' }).then(menus => {
    var menuArr = []
    menuArr.push({ name: __('None', 'obb') })
    jQuery.each(menus, function (key, val) {
      menuArr.push({ name: val.name })
    })
    wpmenus = menuArr
    return menuArr
  }).catch(err => {
    console.log(err.stack)
  })

  // Get Google Fonts
  var gfonts = []
  var gfontsCall = apiFetch({ path: '/obbroute/fonts' }).then(fonts => {
    var fontArr = []
    fontArr.push({ name: __('Theme Default', 'obb') })
    jQuery.each(fonts, function (key, val) {
      fontArr.push({ name: val })
    })
    gfonts = fontArr
    return fontArr
  }).catch(err => {
    console.log(err.stack)
  })

  // Create custom Content Slideshow icon SVG.
  const headerIcon = el('svg',
    {
      class: 'organic-header-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M22,0H2C0.9,0,0,0.9,0,2v20c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V2C24,0.9,23.1,0,22,0z M2,2h20v4H2V2z M2,13h20v7H2V13zM21,9v1h-2V9H21z M18,9v1h-2V9H18z M15,9v1h-2V9H15z M12,9v1h-2V9H12z M6,9.5C6,10.3,5.3,11,4.5,11S3,10.3,3,9.5S3.7,8,4.5,8S6,8.7,6,9.5z M22,22H2v-1h20L22,22z'
        }
      ),
      el('circle',
        {
          fill: '#99cc33',
          cx: '4',
          cy: '4',
          r: 1
        }
      ),
      el('circle',
        {
          fill: '#99cc33',
          cx: '7',
          cy: '4',
          r: 1
        }
      ),
      el('circle',
        {
          fill: '#99cc33',
          cx: '10',
          cy: '4',
          r: 1
        }
      )
    )
  )

  // Register Block.
  const organicHeaderBlock = blocks.registerBlockType('obb/header-block', {
    title: __('Header', 'obb'),
    description: __('Display a custom site header.', 'obb'),
    icon: headerIcon,
    category: 'organic-blocks',
    supports: {
      align: ['wide', 'full']
      // spacing: { // Requires add_theme_support('custom-spacing');
      //   margin: true, // Enable margin UI control.
      //   padding: true // Enable padding UI control.
      // }
    },
    styles: [
      {
        name: 'obb-default',
        label: __('Default', 'obb'),
        isDefault: true
      },
      {
        name: 'obb-center-logo',
        label: __('Center Logo', 'obb')
      }
    ],
    attributes: {
      className: {
        type: 'string'
      },
      align: {
        type: 'string',
        default: 'full'
      },
      logoID: {
        type: 'number',
        default: 0
      },
      logoURL: {
        type: 'string',
        default: ''
      },
      logosecondaryID: {
        type: 'number',
        default: 0
      },
      logosecondaryURL: {
        type: 'string',
        default: ''
      },
      logosize: {
        type: 'number',
        default: 120
      },
      sitetitle: {
        type: 'string'
      },
      sitedesc: {
        type: 'string'
      },
      navigationmenu: {
        type: 'string'
      },
      secondarymenu: {
        type: 'string'
      },
      mobilemenu1: {
        type: 'string'
      },
      mobilemenu2: {
        type: 'string'
      },
      headeralignment: {
        type: 'string',
        default: 'left'
      },
      headerposition: {
        type: 'string',
        default: 'position-relative'
      },
      headercontainer: {
        type: 'string'
      },
      headerwidth: {
        type: 'string'
      },
      sitetitledisp: {
        type: 'boolean',
        default: true
      },
      sitedescdisp: {
        type: 'boolean',
        default: true
      },
      headerscroll: {
        type: 'boolean',
        default: true
      },
      headerborders: {
        type: 'boolean',
        default: false
      },
      mobileview: {
        type: 'boolean',
        default: false
      },
      headershadow: {
        type: 'boolean',
        default: false
      },
      sitetitlefont: {
        type: 'string'
      },
      sitetitlesize: {
        type: 'number',
        default: 36
      },
      sitetitlesizemobile: {
        type: 'number',
        default: 24
      },
      siteweight: {
        type: 'string',
        default: 'normal'
      },
      titlespacing: {
        type: 'number',
        default: 0
      },
      sitedescfont: {
        type: 'string'
      },
      navmenufont: {
        type: 'string'
      },
      navmenucaps: {
        type: 'boolean',
        default: false
      },
      navmenusize: {
        type: 'number',
        default: 16
      },
      navmenuheight: {
        type: 'number',
        default: 24
      },
      navmenuspacing: {
        type: 'number',
        default: 0
      },
      navmenulinkgap: {
        type: 'number',
        default: 12
      },
      submenusize: {
        type: 'number',
        default: 16
      },
      navmenufont2: {
        type: 'string'
      },
      navmenucaps2: {
        type: 'boolean',
        default: false
      },
      navmenusize2: {
        type: 'number',
        default: 16
      },
      navmenuspacing2: {
        type: 'number',
        default: 0
      },
      navmenulinkgap2: {
        type: 'number',
        default: 12
      },
      submenusize2: {
        type: 'number',
        default: 16
      },
      navmenufont3: {
        type: 'string'
      },
      navmenusize3: {
        type: 'number',
        default: 36
      },
      navmenufont4: {
        type: 'string'
      },
      navmenusize4: {
        type: 'number',
        default: 16
      },
      toppadding: {
        type: 'string',
        default: '24'
      },
      bottompadding: {
        type: 'string',
        default: '24'
      },
      leftpadding: {
        type: 'string',
        default: '36'
      },
      rightpadding: {
        type: 'string',
        default: '36'
      },
      sitetitlecolor: {
        type: 'string',
        default: '#000'
      },
      sitedesccolor: {
        type: 'string',
        default: '#000'
      },
      menulinkcolor: {
        type: 'string',
        default: '#666'
      },
      menulinkscroll: {
        type: 'string',
        default: '#666'
      },
      menulinkscrollhover: {
        type: 'string',
        default: '#000'
      },
      submenulinkcolor: {
        type: 'string',
        default: '#666'
      },
      menuhovercolor: {
        type: 'string',
        default: '#000'
      },
      submenuhovercolor: {
        type: 'string',
        default: '#000'
      },
      submenubgcolor: {
        type: 'string',
        default: '#fff'
      },
      submenubggradient: {
        type: 'string'
      },
      headerbgcolor: {
        type: 'string',
        default: '#fff'
      },
      headerbggradient: {
        type: 'string'
      },
      mobilelinkcolor: {
        type: 'string',
        default: '#999'
      },
      mobilehovercolor: {
        type: 'string',
        default: '#000'
      },
      mobilebgcolor: {
        type: 'string',
        default: '#fff'
      },
      mobilebggradient: {
        type: 'string'
      },
      headerbgopacity: {
        type: 'number',
        default: 1.0
      }
    },
    edit: withSelect(function (select, props) {
      return {
        menus: wpmenus,
        fonts: gfonts,
        entities: select('core').getSite()
      }
    })(function (props) {
      // Load all attributes
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var colorsGray = useSetting( 'color.palette' ).concat(obbGray)
      var attributes = props.attributes
      var className = props.attributes.className
      var sitetitle = props.attributes.sitetitle
      var sitedesc = props.attributes.sitedesc
      var navigationmenu = props.attributes.navigationmenu
      var secondarymenu = props.attributes.secondarymenu
      var mobilemenu1 = props.attributes.mobilemenu1
      var mobilemenu2 = props.attributes.mobilemenu2
      var headeralignment = props.attributes.headeralignment
      var headerposition = props.attributes.headerposition
      var headercontainer = props.attributes.headercontainer
      var headerwidth = props.attributes.headerwidth
      var sitetitledisp = props.attributes.sitetitledisp
      var sitedescdisp = props.attributes.sitedescdisp
      var headerscroll = props.attributes.headerscroll
      var headerborders = props.attributes.headerborders
      var mobileview = props.attributes.mobileview
      var headershadow = props.attributes.headershadow
      var sitetitlefont = props.attributes.sitetitlefont
      var sitetitlesize = props.attributes.sitetitlesize
      var sitetitlesizemobile = props.attributes.sitetitlesizemobile
      var siteweight = props.attributes.siteweight
      var titlespacing = props.attributes.titlespacing
      var sitedescfont = props.attributes.sitedescfont
      var navmenufont = props.attributes.navmenufont
      var navmenucaps = props.attributes.navmenucaps
      var navmenusize = props.attributes.navmenusize
      var navmenuheight = props.attributes.navmenuheight
      var navmenuspacing = props.attributes.navmenuspacing
      var navmenulinkgap = props.attributes.navmenulinkgap
      var submenusize = props.attributes.submenusize
      var navmenufont2 = props.attributes.navmenufont2
      var navmenucaps2 = props.attributes.navmenucaps2
      var navmenusize2 = props.attributes.navmenusize2
      var navmenuspacing2 = props.attributes.navmenuspacing2
      var navmenulinkgap2 = props.attributes.navmenulinkgap2
      var submenusize2 = props.attributes.submenusize2
      var navmenufont3 = props.attributes.navmenufont3
      var navmenusize3 = props.attributes.navmenusize3
      var navmenufont4 = props.attributes.navmenufont4
      var navmenusize4 = props.attributes.navmenusize4
      var toppadding = props.attributes.toppadding
      var bottompadding = props.attributes.bottompadding
      var leftpadding = props.attributes.leftpadding
      var rightpadding = props.attributes.rightpadding
      var sitetitlecolor = props.attributes.sitetitlecolor
      var sitedesccolor = props.attributes.sitedesccolor
      var menulinkcolor = props.attributes.menulinkcolor
      var menulinkscroll = props.attributes.menulinkscroll
      var menulinkscrollhover = props.attributes.menulinkscrollhover
      var submenulinkcolor = props.attributes.submenulinkcolor
      var menuhovercolor = props.attributes.menuhovercolor
      var submenuhovercolor = props.attributes.submenuhovercolor
      var submenubgcolor = props.attributes.submenubgcolor
      var submenubggradient = props.attributes.submenubggradient
      var headerbgcolor = props.attributes.headerbgcolor
      var headerbggradient = props.attributes.headerbggradient
      var mobilelinkcolor = props.attributes.mobilelinkcolor
      var mobilehovercolor = props.attributes.mobilehovercolor
      var mobilebgcolor = props.attributes.mobilebgcolor
      var mobilebggradient = props.attributes.mobilebggradient
      var headerbgopacity = props.attributes.headerbgopacity
      var logoID = props.attributes.logoID
      var logoURL = props.attributes.logoURL
      var logosecondaryID = props.attributes.logosecondaryID
      var logosecondaryURL = props.attributes.logosecondaryURL
      var logosize = props.attributes.logosize
      var navOptions = ''
      var fontOptions = ''
      var editmenuhref = ''

      // Once site entities load, get current site title, desc and add edit menu link
      if (props.entities) {
        if (!sitetitle) {
          sitetitle = props.entities.title
        }
        if (!sitedesc) {
          sitedesc = props.entities.description
        }
        // editmenuhref = props.entities.url + '/wp-admin/nav-menus.php'
        editmenuhref = '/wp-admin/nav-menus.php'
      }

      if (props.menus) {
        navOptions = []
        jQuery.each(props.menus, function (key, val) {
          navOptions.push({ label: val.name, value: val.name })
        })
      }

      if (props.fonts) {
        fontOptions = []
        jQuery.each(props.fonts, function (key, val) {
          fontOptions.push({ label: val.name, value: val.name })
        })
      }

      // headerpostBox = el(SelectControl, {
      //   className: 'obb-dropdown',
      //   label: __('Select Navigation Menu', 'obb'),
      //   value: navigationmenu,
      //   options: navOptions,
      //   onChange: function (val) { props.setAttributes({ navigationmenu: val }) }
      // })

      var editmenulink = el('a', {
        className: 'obb-edit-menu',
        href: editmenuhref,
        target: '_blank'
      },
      __('Edit or Create Menus', 'obb')
      )

      // Show front end of plugin if not in edit mode
      var displayEditor = ''

      displayEditor = el(
        ServerSideRender,
        {
          block: 'obb/header-block',
          className: 'organic-header-block',
          httpMethod: 'POST',
          attributes: {
            className: className,
            logoID: logoID,
            logoURL: logoURL,
            logosecondaryID: logosecondaryID,
            logosecondaryURL: logosecondaryURL,
            logosize: logosize,
            sitetitle: sitetitle,
            sitedesc: sitedesc,
            navigationmenu: navigationmenu,
            secondarymenu: secondarymenu,
            mobilemenu1: mobilemenu1,
            mobilemenu2: mobilemenu2,
            headeralignment: headeralignment,
            headerposition: headerposition,
            headercontainer: headercontainer,
            headerwidth: headerwidth,
            sitetitledisp: sitetitledisp,
            sitedescdisp: sitedescdisp,
            headerscroll: headerscroll,
            headerborders: headerborders,
            mobileview: mobileview,
            headershadow: headershadow,
            sitetitlefont: sitetitlefont,
            sitetitlesize: sitetitlesize,
            sitetitlesizemobile: sitetitlesizemobile,
            siteweight: siteweight,
            titlespacing: titlespacing,
            sitedescfont: sitedescfont,
            navmenufont: navmenufont,
            navmenucaps: navmenucaps,
            navmenusize: navmenusize,
            navmenuheight: navmenuheight,
            navmenuspacing: navmenuspacing,
            navmenulinkgap: navmenulinkgap,
            submenusize: submenusize,
            navmenufont2: navmenufont2,
            navmenucaps2: navmenucaps2,
            navmenusize2: navmenusize2,
            navmenuspacing2: navmenuspacing2,
            navmenulinkgap2: navmenulinkgap2,
            submenusize2: submenusize2,
            navmenufont3: navmenufont3,
            navmenusize3: navmenusize3,
            navmenufont4: navmenufont4,
            navmenusize4: navmenusize4,
            toppadding: toppadding,
            bottompadding: bottompadding,
            leftpadding: leftpadding,
            rightpadding: rightpadding,
            sitetitlecolor: sitetitlecolor,
            sitedesccolor: sitedesccolor,
            menulinkcolor: menulinkcolor,
            menulinkscroll: menulinkscroll,
            menulinkscrollhover: menulinkscrollhover,
            submenulinkcolor: submenulinkcolor,
            menuhovercolor: menuhovercolor,
            submenuhovercolor: submenuhovercolor,
            submenubgcolor: submenubgcolor,
            submenubggradient: submenubggradient,
            headerbgcolor: headerbgcolor,
            headerbggradient: headerbggradient,
            mobilelinkcolor: mobilelinkcolor,
            mobilehovercolor: mobilehovercolor,
            mobilebgcolor: mobilebgcolor,
            mobilebggradient: mobilebggradient,
            headerbgopacity: headerbgopacity
          }
        }
      )

      // OnChange functions for media images
      var onSelectLogo = function (media) {
        return props.setAttributes({
          logoURL: media.url,
          logoID: media.id
        })
      }
      var removeLogo = function () {
        return props.setAttributes({
          logoURL: '',
          logoID: 0
        })
      }
      var onSelectSecondaryLogo = function (media) {
        return props.setAttributes({
          logosecondaryURL: media.url,
          logosecondaryID: media.id
        })
      }
      var removeSecondaryLogo = function () {
        return props.setAttributes({
          logosecondaryURL: '',
          logosecondaryID: 0
        })
      }

      // Default media variables and elements
      var logoButtonTxt = ''
      var logoControlClass = 'components-base-control obb-media-upload-control'
      var logoSecondaryButtonTxt = ''
      var logoSecondaryControlClass = 'components-base-control obb-media-upload-control'

      var removeLogoButton = el(Button, {
        className: 'is-secondary',
        onClick: removeLogo
      }, __('Remove Logo', 'obb'))
      var removeSecondaryLogoButton = el(Button, {
        className: 'is-secondary',
        onClick: removeSecondaryLogo
      }, __('Remove Logo', 'obb'))

      if (logoURL) {
        logoControlClass = 'components-base-control obb-media-upload-control'
        logoButtonTxt = __('Change Logo', 'obb')
      } else {
        logoControlClass = 'components-base-control obb-media-upload-control obb-media-empty'
        logoButtonTxt = __('Add Logo', 'obb')
        removeLogoButton = ''
      }

      if (logosecondaryURL) {
        logoSecondaryControlClass = 'components-base-control obb-media-upload-control'
        logoSecondaryButtonTxt = __('Change Logo', 'obb')
      } else {
        logoSecondaryControlClass = 'components-base-control obb-media-upload-control obb-media-empty'
        logoSecondaryButtonTxt = __('Add Secondary Logo', 'obb')
        removeSecondaryLogoButton = ''
      }

      if (logoURL) {
        var logoImg = el('img', { src: logoURL })
      }
      if (logosecondaryURL) {
        var logoSecondaryImg = el('img', { src: logosecondaryURL })
      }

      var logoButtons = el(MediaUpload, {
        onSelect: onSelectLogo,
        type: 'image',
        value: logoID,
        render: function (obj) {
          return el(Button, {
            className: 'is-secondary',
            onClick: obj.open
          },
          logoButtonTxt
          )
        }
      })
      var logoSecondaryButtons = el(MediaUpload, {
        onSelect: onSelectSecondaryLogo,
        type: 'image',
        value: logosecondaryID,
        render: function (obj) {
          return el(Button, {
            className: 'is-secondary',
            onClick: obj.open
          },
          logoSecondaryButtonTxt
          )
        }
      })

      // Return editor content and controls/settings
      return [
        el(
          BlockControls,
          { key: 'controls' },
          el(AlignmentToolbar, {
            value: headeralignment,
            onChange: function (val) { props.setAttributes({ headeralignment: val }) }
          })
        ),
        displayEditor,
        el(
          InspectorControls,
          null,
          el(PanelBody,
            {
              title: __('Site Identity', 'obb')
            },
            el('div', {
              className: logoControlClass
            },
            el('div',
              { className: 'obb-media-upload-image' },
              logoImg
            ),
            logoButtons,
            removeLogoButton
            ),
            (headerbgopacity < 1) && (
              el(BaseControl, {
                id: logoSecondaryControlClass,
                label: __('Secondary Logo', 'obb'),
                help: __('Alternative logo displayed on scroll.', 'obb')
              },
              el('div', {
                className: logoSecondaryControlClass
              },
              el('div',
                {
                  className: 'obb-media-upload-image'
                },
                logoSecondaryImg
              ),
              logoSecondaryButtons,
              removeSecondaryLogoButton
              )
              )
            ),
            el(RangeControl, {
              label: __('Logo Size', 'obb'),
              min: 40,
              max: 640,
              step: 10,
              value: logosize,
              onChange: function (val) { props.setAttributes({ logosize: val }) }
            }),
            el(ToggleControl, {
              label: __('Display Site Title', 'obb'),
              checked: sitetitledisp,
              help: __('Toggle display of site title.', 'obb'),
              onChange: function (val) { props.setAttributes({ sitetitledisp: val }) }
            }),
            el(ToggleControl, {
              label: __('Display Site Description', 'obb'),
              checked: sitedescdisp,
              help: __('Toggle display of site description.', 'obb'),
              onChange: function (val) { props.setAttributes({ sitedescdisp: val }) }
            }),
            (sitetitledisp === true) && (
              el(TextControl, {
                label: __('Site Title', 'obb'),
                type: 'text',
                value: sitetitle,
                onChange: function (val) { props.setAttributes({ sitetitle: val }) }
              })
            ),
            (sitetitledisp === true) && (
              el(SelectControl, {
                label: __('Site Title Font', 'obb'),
                value: sitetitlefont,
                options: fontOptions,
                onChange: function (val) { props.setAttributes({ sitetitlefont: val }) }
              })
            ),
            (sitetitledisp === true) && (
              el(SelectControl, {
                label: __('Site Title Weight', 'obb'),
                value: siteweight,
                options: weightOptions,
                onChange: function (val) { props.setAttributes({ siteweight: val }) }
              })
            ),
            (sitetitledisp === true) && (
              el(RangeControl, {
                label: __('Site Title Font Size', 'obb'),
                help: __('The pixel size for the site title.', 'obb'),
                allowReset: true,
                resetFallbackValue: 36,
                min: 10,
                max: 120,
                step: 1,
                value: sitetitlesize,
                onChange: function (val) { props.setAttributes({ sitetitlesize: val }) }
              }),
              el(RangeControl, {
                label: __('Site Title Font Size Mobile', 'obb'),
                help: __('The pixel size for the mobile site title.', 'obb'),
                allowReset: true,
                resetFallbackValue: 24,
                min: 10,
                max: 120,
                step: 1,
                value: sitetitlesizemobile,
                onChange: function (val) { props.setAttributes({ sitetitlesizemobile: val }) }
              })
            ),
            (sitetitledisp === true) && (
              el(RangeControl, {
                label: __('Site Title Letter Spacing', 'obb'),
                allowReset: true,
                resetFallbackValue: 0,
                min: -10,
                max: 10,
                step: 1,
                value: titlespacing,
                onChange: function (val) { props.setAttributes({ titlespacing: val }) }
              })
            ),
            (sitedescdisp === true) && (
              el(TextControl, {
                label: __('Site Description', 'obb'),
                type: 'text',
                value: sitedesc,
                onChange: function (val) { props.setAttributes({ sitedesc: val }) }
              })
            ),
            (sitedescdisp === true) && (
              el(SelectControl, {
                label: __('Site Description Font', 'obb'),
                value: sitedescfont,
                options: fontOptions,
                onChange: function (val) { props.setAttributes({ sitedescfont: val }) }
              })
            )
          ),
          el(PanelBody,
            {
              title: __('Primary Navigation', 'obb'),
              initialOpen: true,
              icon: 'menu'
            },
            (className !== 'is-style-obb-center-logo') && (
              el(SelectControl, {
                label: __('Primary Menu', 'obb'),
                value: navigationmenu,
                options: navOptions,
                onChange: function (val) { props.setAttributes({ navigationmenu: val }) }
              })
            ),
            (className === 'is-style-obb-center-logo') && (
              el(SelectControl, {
                label: __('Left Menu', 'obb'),
                value: navigationmenu,
                options: navOptions,
                onChange: function (val) { props.setAttributes({ navigationmenu: val }) }
              })
            ),
            editmenulink,
            (navigationmenu && navigationmenu !== 'None') && (
              el(SelectControl, {
                label: __('Menu Font', 'obb'),
                value: navmenufont,
                options: fontOptions,
                onChange: function (val) { props.setAttributes({ navmenufont: val }) }
              })
            ),
            (navigationmenu && navigationmenu !== 'None') && (
              el(ToggleControl, {
                label: __('Capitalize Menu Links', 'obb'),
                checked: navmenucaps,
                onChange: function (val) { props.setAttributes({ navmenucaps: val }) }
              })
            ),
            (navigationmenu && navigationmenu !== 'None') && (
              el(RangeControl, {
                label: __('Font Size', 'obb'),
                help: __('Pixel font size for top level menu.', 'obb'),
                allowReset: true,
                resetFallbackValue: 16,
                min: 10,
                max: 60,
                step: 1,
                value: navmenusize,
                onChange: function (val) { props.setAttributes({ navmenusize: val }) }
              })
            ),
            (navigationmenu && navigationmenu !== 'None') && (
              el(RangeControl, {
                label: __('Menu Height', 'obb'),
                help: __('Line height for top level menu.', 'obb'),
                allowReset: true,
                resetFallbackValue: 24,
                min: 10,
                max: 120,
                step: 1,
                value: navmenuheight,
                onChange: function (val) { props.setAttributes({ navmenuheight: val }) }
              })
            ),
            (navigationmenu && navigationmenu !== 'None') && (
              el(RangeControl, {
                label: __('Submenu Font Size', 'obb'),
                help: __('Pixel font size for submenus.', 'obb'),
                allowReset: true,
                resetFallbackValue: 16,
                min: 10,
                max: 60,
                step: 1,
                value: submenusize,
                onChange: function (val) { props.setAttributes({ submenusize: val }) }
              })
            ),
            (navigationmenu && navigationmenu !== 'None') && (
              el(RangeControl, {
                label: __('Letter Spacing', 'obb'),
                help: __('Letter spacing for menu links.', 'obb'),
                allowReset: true,
                resetFallbackValue: 0,
                min: -10,
                max: 10,
                step: 1,
                value: navmenuspacing,
                onChange: function (val) { props.setAttributes({ navmenuspacing: val }) }
              })
            ),
            (navigationmenu && navigationmenu !== 'None') && (
              el(RangeControl, {
                label: __('Link Spacing', 'obb'),
                help: __('Horizontal spacing between each menu link.', 'obb'),
                allowReset: true,
                resetFallbackValue: 12,
                min: 4,
                max: 60,
                step: 1,
                value: navmenulinkgap,
                onChange: function (val) { props.setAttributes({ navmenulinkgap: val }) }
              })
            )
          ),
          el(PanelBody,
            {
              title: __('Secondary Navigation', 'obb'),
              initialOpen: false,
              icon: 'menu'
            },
            (className !== 'is-style-obb-center-logo') && (
              el(SelectControl, {
                label: __('Secondary Menu', 'obb'),
                value: secondarymenu,
                options: navOptions,
                onChange: function (val) { props.setAttributes({ secondarymenu: val }) }
              })
            ),
            (className === 'is-style-obb-center-logo') && (
              el(SelectControl, {
                label: __('Right Menu', 'obb'),
                value: secondarymenu,
                options: navOptions,
                onChange: function (val) { props.setAttributes({ secondarymenu: val }) }
              })
            ),
            editmenulink,
            (secondarymenu && secondarymenu !== 'None') && (
              el(SelectControl, {
                label: __('Menu Font', 'obb'),
                value: navmenufont2,
                options: fontOptions,
                onChange: function (val) { props.setAttributes({ navmenufont2: val }) }
              })
            ),
            (secondarymenu && secondarymenu !== 'None') && (
              el(ToggleControl, {
                label: __('Capitalize Menu Links', 'obb'),
                checked: navmenucaps2,
                onChange: function (val) { props.setAttributes({ navmenucaps2: val }) }
              })
            ),
            (secondarymenu && secondarymenu !== 'None') && (
              el(RangeControl, {
                label: __('Font Size', 'obb'),
                help: __('Pixel font size for top level menu.', 'obb'),
                allowReset: true,
                resetFallbackValue: 16,
                min: 10,
                max: 60,
                step: 1,
                value: navmenusize2,
                onChange: function (val) { props.setAttributes({ navmenusize2: val }) }
              })
            ),
            (secondarymenu && secondarymenu !== 'None') && (
              el(RangeControl, {
                label: __('Submenu Menu Size', 'obb'),
                help: __('Pixel font size for submenus.', 'obb'),
                allowReset: true,
                resetFallbackValue: 16,
                min: 10,
                max: 60,
                step: 1,
                value: submenusize2,
                onChange: function (val) { props.setAttributes({ submenusize2: val }) }
              })
            ),
            (secondarymenu && secondarymenu !== 'None') && (
              el(RangeControl, {
                label: __('Letter Spacing', 'obb'),
                help: __('Letter spacing for menu links.', 'obb'),
                allowReset: true,
                resetFallbackValue: 0,
                min: -10,
                max: 10,
                step: 1,
                value: navmenuspacing2,
                onChange: function (val) { props.setAttributes({ navmenuspacing2: val }) }
              })
            ),
            (secondarymenu && secondarymenu !== 'None') && (
              el(RangeControl, {
                label: __('Link Spacing', 'obb'),
                help: __('Horizontal spacing between menu links.', 'obb'),
                allowReset: true,
                resetFallbackValue: 12,
                min: 4,
                max: 60,
                step: 1,
                value: navmenulinkgap2,
                onChange: function (val) { props.setAttributes({ navmenulinkgap2: val }) }
              })
            )
          ),
          el(PanelBody,
            {
              title: __('Mobile Primary Navigation', 'obb'),
              initialOpen: false,
              icon: 'menu'
            },
            el(SelectControl, {
              label: __('Mobile Menu Primary', 'obb'),
              value: mobilemenu1,
              options: navOptions,
              onChange: function (val) { props.setAttributes({ mobilemenu1: val }) }
            }),
            editmenulink,
            (mobilemenu1 && mobilemenu1 !== 'None') && (
              el(SelectControl, {
                label: __('Menu Font', 'obb'),
                value: navmenufont3,
                options: fontOptions,
                onChange: function (val) { props.setAttributes({ navmenufont3: val }) }
              })
            ),
            (mobilemenu1 && mobilemenu1 !== 'None') && (
              el(RangeControl, {
                label: __('Font Size', 'obb'),
                help: __('Pixel font size for the menu.', 'obb'),
                allowReset: true,
                resetFallbackValue: 36,
                min: 10,
                max: 60,
                step: 1,
                value: navmenusize3,
                onChange: function (val) { props.setAttributes({ navmenusize3: val }) }
              })
            )
          ),
          el(PanelBody,
            {
              title: __('Mobile Secondary Navigation', 'obb'),
              initialOpen: false,
              icon: 'menu'
            },
            el(SelectControl, {
              label: __('Mobile Menu Secondary', 'obb'),
              value: mobilemenu2,
              options: navOptions,
              onChange: function (val) { props.setAttributes({ mobilemenu2: val }) }
            }),
            editmenulink,
            (mobilemenu2 && mobilemenu2 !== 'None') && (
              el(SelectControl, {
                label: __('Menu Font', 'obb'),
                value: navmenufont4,
                options: fontOptions,
                onChange: function (val) { props.setAttributes({ navmenufont4: val }) }
              })
            ),
            (mobilemenu2 && mobilemenu2 !== 'None') && (
              el(RangeControl, {
                label: __('Font Size', 'obb'),
                help: __('Pixel font size for the menu.', 'obb'),
                allowReset: true,
                resetFallbackValue: 36,
                min: 10,
                max: 60,
                step: 1,
                value: navmenusize4,
                onChange: function (val) { props.setAttributes({ navmenusize4: val }) }
              })
            )
          ),
          el(PanelBody,
            {
              title: __('Display', 'obb'),
              initialOpen: false,
              icon: 'visibility'
            },
            el(RangeControl, {
              label: __('Background Transparency', 'obb'),
              allowReset: true,
              resetFallbackValue: 1.0,
              max: 1.0,
              min: 0.0,
              step: 0.1,
              value: headerbgopacity,
              onChange: function (val) { props.setAttributes({ headerbgopacity: val }) }
            }),
            (headerbgopacity < 1) && (
              el(ToggleControl, {
                label: __('Display Background On Scroll', 'obb'),
                checked: headerscroll,
                help: __('Toggle the header background on scroll.', 'obb'),
                onChange: function (val) { props.setAttributes({ headerscroll: val }) }
              })
            ),
            el(ToggleControl, {
              label: __('Shadow Behind Header', 'obb'),
              checked: headershadow,
              help: __('Toggle the header background shadow.', 'obb'),
              onChange: function (val) { props.setAttributes({ headershadow: val }) }
            }),
            el(ToggleControl, {
              label: __('Link Dividers', 'obb'),
              checked: headerborders,
              help: __('Toggle display of header link dividers.', 'obb'),
              onChange: function (val) { props.setAttributes({ headerborders: val }) }
            }),
            el(ToggleControl, {
              label: __('Mobile Style Only', 'obb'),
              checked: mobileview,
              help: __('Show only hamburger icon and slide menu.', 'obb'),
              onChange: function (val) { props.setAttributes({ mobileview: val }) }
            })
          ),
          el(PanelBody,
            {
              title: __('Layout', 'obb'),
              initialOpen: false,
              icon: 'move'
            },
            el(SelectControl, {
              label: __('Header Position', 'obb'),
              value: headerposition,
              options: headingOptions,
              onChange: function (val) { props.setAttributes({ headerposition: val }) }
            }),
            el(TextControl, {
              label: __('Header Container Width', 'obb'),
              placeholder: '1280',
              help: __('Maximum width of header.', 'obb'),
              type: 'number',
              min: 640,
              value: headercontainer,
              onChange: function (val) { props.setAttributes({ headercontainer: val }) }
            }),
            el(TextControl, {
              label: __('Header Content Width', 'obb'),
              placeholder: '1280',
              help: __('Maximum width of header content.', 'obb'),
              type: 'number',
              min: 640,
              value: headerwidth,
              onChange: function (val) { props.setAttributes({ headerwidth: val }) }
            }),
            el(
              'div', {
                className: 'obb-layout-padding'
              },
              el(TextControl, {
                label: __('Top Padding', 'obb'),
                type: 'number',
                min: 1,
                max: 999,
                value: toppadding,
                onChange: function (val) { props.setAttributes({ toppadding: val }) }
              }),
              el(TextControl, {
                label: __('Bottom Padding', 'obb'),
                type: 'number',
                min: 1,
                max: 999,
                value: bottompadding,
                onChange: function (val) { props.setAttributes({ bottompadding: val }) }
              }),
              el(TextControl, {
                label: __('Left Padding', 'obb'),
                type: 'number',
                min: 1,
                max: 999,
                value: leftpadding,
                onChange: function (val) { props.setAttributes({ leftpadding: val }) }
              }),
              el(TextControl, {
                label: __('Right Padding', 'obb'),
                type: 'number',
                min: 1,
                max: 999,
                value: rightpadding,
                onChange: function (val) { props.setAttributes({ rightpadding: val }) }
              })
            )
          ),
          el(PanelColorSettings, {
            title: __('Colors', 'obb'),
            initialOpen: false,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                label: __('Header Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: headerbgcolor,
                gradientValue: headerbggradient,
                onChange: function (val) { props.setAttributes({ headerbgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ headerbggradient: val }) }
              },
              {
                label: __('Submenu Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: submenubgcolor,
                gradientValue: submenubggradient,
                onChange: function (val) { props.setAttributes({ submenubgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ submenubggradient: val }) }
              },
              {
                label: __('Mobile Menu Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: mobilebgcolor,
                gradientValue: mobilebggradient,
                onChange: function (val) { props.setAttributes({ mobilebgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ mobilebggradient: val }) }
              },
              (sitetitledisp === true) && (
                {
                  colors: colorOptions,
                  label: __('Site Title Color', 'obb'),
                  value: sitetitlecolor,
                  onChange: function (val) { props.setAttributes({ sitetitlecolor: val }) }
                }
              ),
              (sitedescdisp === true) && (
                {
                  colors: colorOptions,
                  label: __('Site Description Color', 'obb'),
                  value: sitedesccolor,
                  onChange: function (val) { props.setAttributes({ sitedesccolor: val }) }
                }
              ),
              {
                colors: colorsGray,
                label: __('Menu Link Color', 'obb'),
                value: menulinkcolor,
                onChange: function (val) { props.setAttributes({ menulinkcolor: val }) }
              },
              {
                colors: colorsGray,
                label: __('Menu Link Hover Color', 'obb'),
                value: menuhovercolor,
                onChange: function (val) { props.setAttributes({ menuhovercolor: val }) }
              },
              (headerbgopacity < 1 && headerscroll === true) && (
                {
                  colors: colorsGray,
                  label: __('Menu Link Color On Scoll', 'obb'),
                  value: menulinkscroll,
                  onChange: function (val) { props.setAttributes({ menulinkscroll: val }) }
                }
              ),
              (headerbgopacity < 1 && headerscroll === true) && (
                {
                  colors: colorsGray,
                  label: __('Menu Link Hover Color On Scoll', 'obb'),
                  value: menulinkscrollhover,
                  onChange: function (val) { props.setAttributes({ menulinkscrollhover: val }) }
                }
              ),
              {
                colors: colorsGray,
                label: __('Submenu Link Color', 'obb'),
                value: submenulinkcolor,
                onChange: function (val) { props.setAttributes({ submenulinkcolor: val }) }
              },
              {
                colors: colorsGray,
                label: __('Submenu Hover Color', 'obb'),
                value: submenuhovercolor,
                onChange: function (val) { props.setAttributes({ submenuhovercolor: val }) }
              },
              {
                colors: colorsGray,
                label: __('Mobile Menu Link Color', 'obb'),
                value: mobilelinkcolor,
                onChange: function (val) { props.setAttributes({ mobilelinkcolor: val }) }
              },
              {
                colors: colorsGray,
                label: __('Mobile Menu Hover Color', 'obb'),
                value: mobilehovercolor,
                onChange: function (val) { props.setAttributes({ mobilehovercolor: val }) }
              }
            ]
          })
        )
      ]
    }),
    save: function (props) {
      return null
    }
  })
})(
  window.wp.data,
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.element,
  window.wp.i18n,
  window.wp.serverSideRender,
  window.wp.apiFetch
)
