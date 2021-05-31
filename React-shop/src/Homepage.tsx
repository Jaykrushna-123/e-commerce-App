import React from "react";
import classes from "./Demo.module.css";


class Homepage extends React.Component{
 
  render() {
   
    return (
        <div className="row">
       

<div className={classes.landingSection}>
  <h1 className={classes.mainHeading}>
    Simple App that we <br /><span className={classes.txtCreate}>CREATE</span>
  </h1>
  <p className={classes.para}>
    Comming Soon...
  </p>
  <button className={classes.btnPrimary}>KNOW US BETTER</button>
</div>

<div className={classes.secondSection}>
<h1 className={classes.provide}>We Provide</h1>
  <div className={classes.featureCardGrid}>
  <div className={classes.featureCard}>
    <img src="https://lava-homepage.firebaseapp.com/assets/images/features-icon-1.png" alt="Trend Analysis" />
    <h3 className={classes.featureCardHeading}>IT Services</h3>
    <p className={classes.featureCardDesc}>Curabitur pulvinar vel odio sed sagittis. Nam maximus ex diam, nec consectetur diam.</p>
    <button  className={classes.btnPrimary}>READ MORE</button>
  </div>
  <div className={classes.featureCard}>
    <img src="https://lava-homepage.firebaseapp.com/assets/images/features-icon-2.png" alt="Site Optimization" />
    <h3 className={classes.featureCardHeading}>Interior Design</h3>
    <p className={classes.featureCardDesc}>Curabitur pulvinar vel odio sed sagittis. Nam maximus ex diam, nec consectetur diam.</p>
    <button className={classes.btnPrimary} >DISCOVER MORE</button>
  </div>
  <div className={classes.featureCard}>
    <img src="https://lava-homepage.firebaseapp.com/assets/images/features-icon-3.png" alt="Trend Analysis" />
    <h3 className={classes.featureCardHeading}>home Appliances </h3>
    <p className={classes.featureCardDesc}>Curabitur pulvinar vel odio sed sagittis. Nam maximus ex diam, nec consectetur diam.</p>
    <button className={classes.btnPrimary}>MORE DETAIL</button>
  </div>
  </div>
</div>
      </div>
    );
  }
}
export default Homepage;
