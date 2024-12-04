function resetPasswordEmailHtmlTemplate({
  username,
  resetPasswordUrl,
  baseUrl,
}) {
  return `
  <!DOCTYPE html>
  
  <html
    lang="en"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
  >
    <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <!--[if mso
        ]><xml
          ><o:OfficeDocumentSettings
            ><o:PixelsPerInch>96</o:PixelsPerInch
            ><o:AllowPNG /></o:OfficeDocumentSettings></xml
      ><![endif]-->
      <!--[if !mso]><!-->
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900"
        rel="stylesheet"
        type="text/css"
      />
      <!--<![endif]-->
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        sup,
        sub {
          font-size: 75%;
          line-height: 0;
        }
  
        .menu_block.desktop_hide .menu-links span {
          mso-hide: all;
        }
  
        @media (max-width: 640px) {
          .desktop_hide table.icons-outer {
            display: inline-table !important;
          }
  
          .desktop_hide table.icons-inner,
          .social_block.desktop_hide .social-table {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
  
          .reverse {
            display: table;
            width: 100%;
          }
  
          .reverse .column.last {
            display: table-header-group !important;
          }
  
          .row-4 td.column.last .border {
            padding: 25px 20px 20px;
            border-top: 0;
            border-right: 0px;
            border-bottom: 0;
            border-left: 0;
          }
  
          .row-1 .column-1 {
            padding: 20px 20px 5px !important;
          }
  
          .row-1 .column-3 {
            padding: 5px 20px 25px !important;
          }
        }
      </style>
      <!--[if mso
        ]><style>
          sup,
          sub {
            font-size: 100% !important;
          }
          sup {
            mso-text-raise: 10%;
          }
          sub {
            mso-text-raise: -10%;
          }
        </style>
      <![endif]-->
    </head>
    <body
      class="body"
      style="
        background-color: #e6e6e6;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      "
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="nl-container"
        role="presentation"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #e6e6e6;
        "
        width="100%"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-1"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #ffffff;
                          border-radius: 0;
                          color: #000000;
                          width: 620px;
                          margin: 0 auto;
                        "
                        width="620"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-left: 20px;
                                padding-right: 20px;
                                padding-top: 5px;
                                vertical-align: middle;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="25%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="icons_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  text-align: center;
                                  line-height: 0;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      vertical-align: middle;
                                      color: #000000;
                                      font-family: inherit;
                                      font-size: 14px;
                                      font-weight: 400;
                                      text-align: center;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="icons-outer"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-table;
                                      "
                                    >
                                      <tr>
                                        <td
                                          style="
                                            vertical-align: middle;
                                            text-align: center;
                                            padding-top: 0px;
                                            padding-bottom: 0px;
                                            padding-left: 0px;
                                            padding-right: 0px;
                                          "
                                        >
                                          <a
                                            href="${baseUrl}"
                                            style="text-decoration: none"
                                            target="_self"
                                            ><img
                                              align="center"
                                              alt="Logo"
                                              class="icon"
                                              height="auto"
                                            src="https://d312364fea.imgdist.com/pub/bfra/pu1huc1n/bs6/pre/yxr/blog-icon.webp"
                                              style="
                                                display: block;
                                                height: auto;
                                                margin: 0 auto;
                                                border: 0;
                                              "
                                              width="32"
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td
                              class="column column-2"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-left: 20px;
                                padding-right: 20px;
                                padding-top: 5px;
                                vertical-align: middle;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="50%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="menu_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="alignment"
                                          style="
                                            text-align: center;
                                            font-size: 0px;
                                          "
                                        >
                                          <div class="menu-links">
                                            <!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style=""><tr style="text-align:center;"><!
                                            [endif]-->[endif]--><!--[if mso]><td style="padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px"><!
                                            [endif]-->
                                            <a
                                              href="${baseUrl}about"
                                              style="
                                                mso-hide: false;
                                                padding-top: 5px;
                                                padding-bottom: 5px;
                                                padding-left: 5px;
                                                padding-right: 5px;
                                                display: inline-block;
                                                color: #101112;
                                                font-family: Montserrat,
                                                  Trebuchet MS, Lucida Grande,
                                                  Lucida Sans Unicode, Lucida Sans,
                                                  Tahoma, sans-serif;
                                                font-size: 16px;
                                                text-decoration: none;
                                                letter-spacing: normal;
                                              "
                                              target="_self"
                                              >About</a>
                                            
                                            ><!--[if mso]></td><!
                                            [endif]-->[endif]--><!--[if mso]><td style="padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px"><!
                                            [endif]-->
                                            
                                            <a
                                              href="${baseUrl}"
                                              style="
                                                mso-hide: false;
                                                padding-top: 5px;
                                                padding-bottom: 5px;
                                                padding-left: 5px;
                                                padding-right: 5px;
                                                display: inline-block;
                                                color: #101112;
                                                font-family: Montserrat,
                                                  Trebuchet MS, Lucida Grande,
                                                  Lucida Sans Unicode, Lucida Sans,
                                                  Tahoma, sans-serif;
                                                font-size: 16px;
                                                text-decoration: none;
                                                letter-spacing: normal;
                                              "
                                              target="_self"
                                              >Articles</a
                                            >
                                            
                                            ><!--[if mso]></td><!
                                            [endif]-->[endif]--><!--[if mso]><td style="padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px"><!
                                            [endif]-->
                                            
                                            <a
                                              href="${baseUrl}admin/login"
                                              style="
                                                mso-hide: false;
                                                padding-top: 5px;
                                                padding-bottom: 5px;
                                                padding-left: 5px;
                                                padding-right: 5px;
                                                display: inline-block;
                                                color: #101112;
                                                font-family: Montserrat,
                                                  Trebuchet MS, Lucida Grande,
                                                  Lucida Sans Unicode, Lucida Sans,
                                                  Tahoma, sans-serif;
                                                font-size: 16px;
                                                text-decoration: none;
                                                letter-spacing: normal;
                                              "
                                              target="_self"
                                              >Log in</a
                                            >
                                            
                                            ><!--[if mso]></td><!
                                            [endif]-->[endif]--><!--[if mso]></tr></table><![endif]-->
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td
                              class="column column-3"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-left: 20px;
                                padding-right: 20px;
                                padding-top: 5px;
                                vertical-align: middle;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="25%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="social_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-left: 5px;
                                      padding-right: 5px;
                                      text-align: center;
                                    "
                                  >
                                    <div align="center" class="alignment">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="social-table"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          display: inline-block;
                                        "
                                        width="71.57427937915743px"
                                      >
                                        <tr>
                                          <td style="padding: 0 2px 0 2px">
                                            <a
                                              href="https://github.com/AlexLeiba"
                                              target="_blank"
                                              ><img
                                                alt="Custom"
                                                height="auto"
                                                src="https://d312364fea.imgdist.com/pub/bfra/pu1huc1n/utl/nbu/lp8/github.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="Custom"
                                                width="31.574279379157428"
                                            /></a>
                                          </td>
                                          <td style="padding: 0 2px 0 2px">
                                            <a
                                              href="https://www.linkedin.com/in/alex-leiba-9205801ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                                              target="_blank"
                                              ><img
                                                alt="Custom"
                                                height="auto"
                                                src="https://d312364fea.imgdist.com/pub/bfra/pu1huc1n/2il/g7b/pz7/linkedin-icon.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="Custom"
                                                width="32"
                                            /></a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-2"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #ffffff;
                          color: #000000;
                          width: 620px;
                          margin: 0 auto;
                        "
                        width="620"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 40px;
                                padding-left: 20px;
                                padding-right: 20px;
                                padding-top: 40px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-top: 10px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #393d47;
                                        direction: ltr;
                                        font-family: Arial, 'Helvetica Neue',
                                          Helvetica, sans-serif;
                                        font-size: 38px;
                                        font-weight: 400;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: center;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                        mso-line-height-alt: 45.6px;
                                      "
                                    >
                                      <span
                                        class="tinyMce-placeholder"
                                        style="word-break: break-word"
                                        >Forgot password</span
                                      >
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="icons_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  text-align: center;
                                  line-height: 0;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      vertical-align: middle;
                                      color: #000000;
                                      font-family: inherit;
                                      font-size: 14px;
                                      font-weight: 400;
                                      text-align: center;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="icons-outer"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-table;
                                      "
                                    >
                                      <tr>
                                        <td
                                          style="
                                            vertical-align: middle;
                                            text-align: center;
                                            padding-top: 5px;
                                            padding-bottom: 5px;
                                            padding-left: 5px;
                                            padding-right: 5px;
                                          "
                                        >
                                          <img
                                            align="center"
                                            class="icon"
                                            height="auto"
                                            src="https://d312364fea.imgdist.com/pub/bfra/pu1huc1n/v5b/ari/kuh/forgot-password-icon.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              margin: 0 auto;
                                              border: 0;
                                            "
                                            width="128"
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="paragraph_block block-3"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-top: 20px;
                                    "
                                  >
                                    <div
                                      style="
                                        color: #393d47;
                                        direction: ltr;
                                        font-family: Montserrat, Trebuchet MS,
                                          Lucida Grande, Lucida Sans Unicode,
                                          Lucida Sans, Tahoma, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 150%;
                                        text-align: center;
                                        mso-line-height-alt: 24px;
                                      "
                                    >
                                      <p style="margin: 0; margin-bottom: 16px">
                                        <strong>Welcome back ${username}</strong>
                                      </p>
                                      <p style="margin: 0; margin-bottom: 16px">
                                        We're excited to have you back on board!
                                      </p>
                                      <p style="margin: 0; margin-bottom: 16px">
                                        Please reset your password by clicking the
                                        reset password button below
                                      </p>
                                      <p style="margin: 0">
                                        <strong
                                          >The link will expire in 5
                                          minutes.</strong
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-3"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #eeeeee;
                          border-left: 20px solid #ffffff;
                          border-radius: 0;
                          border-right: 20px solid #ffffff;
                          color: #000000;
                          width: 620px;
                          margin: 0 auto;
                        "
                        width="620"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="button_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div align="center" class="alignment">
                                      <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${resetPasswordUrl}" style="height:42px;width:104px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#170f2e">
  <w:anchorlock/>
  <v:textbox inset="0px,0px,0px,0px">
  <center dir="false" style="color:#ffffff;font-family:Tahoma, sans-serif;font-size:16px">
  <!
                                      [endif]--><a
                                        href="${resetPasswordUrl}"
                                        style="
                                          background-color: #170f2e;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          border-radius: 4px;
                                          border-right: 0px solid transparent;
                                          border-top: 0px solid transparent;
                                          color: #ffffff;
                                          display: inline-block;
                                          font-family: Montserrat, Trebuchet MS,
                                            Lucida Grande, Lucida Sans Unicode,
                                            Lucida Sans, Tahoma, sans-serif;
                                          font-size: 16px;
                                          font-weight: 400;
                                          mso-border-alt: none;
                                          padding-bottom: 5px;
                                          padding-top: 5px;
                                          text-align: center;
                                          text-decoration: none;
                                          width: auto;
                                          word-break: keep-all;
                                        "
                                        target="_blank"
                                        ><span
                                          style="
                                            word-break: break-word;
                                            padding-left: 20px;
                                            padding-right: 20px;
                                            font-size: 16px;
                                            display: inline-block;
                                            letter-spacing: normal;
                                          "
                                          ><span
                                            style="
                                              word-break: break-word;
                                              line-height: 32px;
                                            "
                                            >Reset password</span
                                          ></span
                                        ></a
                                      >
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-4"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #ffffff;
                          color: #000000;
                          width: 620px;
                          margin: 0 auto;
                        "
                        width="620"
                      >
                        <tbody>
                          <tr class="reverse">
                            <td
                              class="column column-1 last"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 20px;
                                padding-left: 20px;
                                padding-right: 20px;
                                padding-top: 25px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <div class="border">
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="icons_block block-1"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    text-align: center;
                                    line-height: 0;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        vertical-align: middle;
                                        color: #000000;
                                        font-family: inherit;
                                        font-size: 14px;
                                        font-weight: 400;
                                        text-align: center;
                                      "
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="icons-outer"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          display: inline-table;
                                        "
                                      >
                                        <tr>
                                          <td
                                            style="
                                              vertical-align: middle;
                                              text-align: center;
                                              padding-top: 0px;
                                              padding-bottom: 0px;
                                              padding-left: 0px;
                                              padding-right: 0px;
                                            "
                                          >
                                            <a
                                              href="${baseUrl}"
                                              style="text-decoration: none"
                                              target="_self"
                                              ><img
                                                align="center"
                                                alt="Logo"
                                                class="icon"
                                                height="auto"
                                                src="https://d312364fea.imgdist.com/pub/bfra/pu1huc1n/bs6/pre/yxr/blog-icon.webp"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  margin: 0 auto;
                                                  border: 0;
                                                "
                                                width="32"
                                            /></a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="text_block block-2"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td class="pad" style="padding-top: 15px">
                                      <div style="font-family: sans-serif">
                                        <div
                                          class=""
                                          style="
                                            font-size: 12px;
                                            font-family: Montserrat, Trebuchet MS,
                                              Lucida Grande, Lucida Sans Unicode,
                                              Lucida Sans, Tahoma, sans-serif;
                                            mso-line-height-alt: 14.399999999999999px;
                                            color: #555555;
                                            line-height: 1.2;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 16px;
                                              text-align: center;
                                              mso-line-height-alt: 19.2px;
                                            "
                                          >
                                            <span
                                              style="
                                                word-break: break-word;
                                                font-size: 14px;
                                              "
                                              >2024 © Built with Node.Js
                                              Express.Js and MongoDB</span
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
           
            </td>
          </tr>
        </tbody>
      </table>
      <!-- End -->
    </body>
  </html>
  `;
}

module.exports = resetPasswordEmailHtmlTemplate;
