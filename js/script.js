// PhotoSwipe
initPhotoSwipeFromDOM('.my-gallery');

$(function () {

  $('.card-caption').on('click', 'a', function (e) {
    e.stopPropagation();
  });

  var $nav = $('#gnav');
  var offset = $nav.offset();
  var navHeight = $nav.innerHeight();
  var headerInner = $('#header .inner');

  //ページ内スクロール
  $('a[href^="#"]').on('click', function () {
    var speed = 300;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");
    return false;
  });

  //ページトップへもどる
  $('#js-pageTop').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300);
    return false;
  });

});

const LightBulb = ({hue = 0, isOn = false}) => <svg viewBox="-22.5 -37.5 45 52">
<g stroke="hsl(0, 0%, 90%)" fill="none">
  <circle strokeWidth="1" cy="-15" r="15" />
  <path strokeWidth="1" d="M -2 0 v -12 a 3 3 0 0 0 -6 0 3 3 0 0 0 3 3 h 9 a 3 3 0 0 0 3 -3 3 3 0 0 0 -6 0 v 12" />
</g>
{
  isOn &&
  <g stroke={`hsl(${hue}, 80%, 70%)`}>
  <g fill="none" strokeWidth="1.5" strokeLinecap="round">
    <g transform="translate(0 -15)">
      <path transform="translate(0 -18.75)" d="M 0 0 v -3" />
      <path transform=" rotate(45) translate(0 -18.75)" d="M 0 0 v -3" />
      <path transform=" rotate(-45) translate(0 -18.75)" d="M 0 0 v -3" />
      <path transform=" rotate(90) translate(0 -18.75)" d="M 0 0 v -3" />
      <path transform=" rotate(-90) translate(0 -18.75)" d="M 0 0 v -3" />
      <path transform=" rotate(135) translate(0 -18.75)" d="M 0 0 v -3" />
      <path transform=" rotate(-135) translate(0 -18.75)" d="M 0 0 v -3" />
    </g>
  </g>
  <g>
    <circle fill={`hsl(${hue}, 80%, 60%)`} strokeWidth="1" cy="-15" r="15" />
    <path stroke={`hsl(${hue}, 80%, 40%)`} fill="none" strokeWidth="1" d="M -2 0 v -12 a 3 3 0 0 0 -6 0 3 3 0 0 0 3 3 h 9 a 3 3 0 0 0 3 -3 3 3 0 0 0 -6 0 v 12" />
  </g>
  </g>
}
<g fill="hsl(0, 0%, 80%)" stroke="hsl(0, 0%, 70%)" strokeWidth="1">
  <circle cy="9" r="5" />
  <rect x="-7" width="14" height="5" rx="2.5" />
  <rect x="-7" width="14" y="5" height="5" rx="2.5" />
</g>
</svg>


class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DIGITS: 8,
      count: 0,
      interval: 0,
    }
  }

  componentDidMount() {
    const interval = setInterval(() => {
      const {count, DIGITS} = this.state;
      const newCount = count + 1
      this.setState({
        count: newCount >= 2 ** DIGITS ? 0 : newCount
      })
    }, 1000)
    this.setState({interval})
  }
  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  render() {
    const { count, DIGITS } = this.state;

    const binary = count
                    // to binary
                    .toString(2)
                    // padded to have an arbitrary number of digits
                    .padStart(DIGITS, "0")
                    // to an array
                    .split("")
                    .map((value, index, { length }) => ({
                      key: index,
                      hue: 360 - (360 / length * index),
                      isOn: value === "1",
                    }))
    return (
      <div>
        {
          // render one svg for each value
          binary.map(({key, hue, isOn}) => <LightBulb key={key} hue={hue} isOn={isOn} />)
        }
      </div>

    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'));

