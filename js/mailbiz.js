(function (m, a, i, l, b, z, j, s) {
  if (m[z]) return;
  m[z] = {
    id: b,
    ready: 0,
  };
  z = a.createElement(i);
  j = a.getElementsByTagName(i)[0];
  z.async = 1;
  z.src = l;
  j.parentNode.insertBefore(z, j);
})(
  window,
  document,
  'script',
  'https://d3eq1zq78ux3cv.cloudfront.net/static/scripts/integration.min.js',
  '5eb061e82663346c07436c01',
  'MailbizIntegration'
);
