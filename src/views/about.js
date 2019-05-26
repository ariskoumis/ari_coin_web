import React from 'react';
import {
    Container,
    Card,
    CardBody,
    CardTitle,
    InputGroup,
    InputGroupAddon,
    Input,
    Button
    } from 'reactstrap';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Container>
                <Card body>
                    <CardTitle>About</CardTitle>
                    <CardBody>
                        Digital currency is an emerging topic in finance that has attracted many due to its futuristic nature and potential for high yields. In order to capitalize on the digital currency hype my team has created AriCoin, a digital currency revolving around my existence. AriCoin is perfect for the everyday investor, as well any fans of Ari Koumis. While the coin has already garnered a huge amount of attention in the world of finance, there exists no one-stop shop for buying, selling, and tracking the coin. To alleviate this our group is developing AriCoinWeb, a web interface that will encourage the lively commerce of those that purchase AriCoins.
                        <br/>
                        <br/>
                        Please note that AriCoins have no actual use in any marketplace for the time being, however future services I'm considering would allow users to exchange their AriCoins for special services provided by me, including washing someone's car, going out to lunch with them, or writing them a heartfelt letter.                         
                    </CardBody>

                    {/* <Button color ="danger" block onClick={this.removeAllUsers}>Remove All Users</Button> */}
                </Card>
            </Container>
        );
    }
}